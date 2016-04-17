import Tile from './Tile.jsx';
import Parenthesis from './Parenthesis.jsx';
import $ from 'jquery';
import Operator from './Operator.jsx';
import EqualsSign from './EqualsSign.jsx';
import Result from './Result.jsx';
import React from 'react';
import Utils from './utils.js';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import EventEmitter from 'wolfy87-eventemitter';
import heir from 'heir';
import objectAssign from 'object-assign';

class Game extends React.Component {

  static get TILE_STATES() {
    return {
      STATIC: 'static',
      TRANSITIONING: 'transitioning',
      ACTIVE: 'active'
    }
  }

  constructor(props) {
    super(props);

    window.addEventListener('newGame', event => {
      this.currentState.numbers = Utils.shuffle(Utils.getRandomPuzzle(props.puzzles));
      this.currentState.operators = Utils.shuffle(props.operators).slice(0, 3);
      this.currentState.parentheses = [null, null];
      this.updateState(); 
    });

    /* Default spring physics */
    this.springConfig = {stiffness: 450, damping: 50, precision: 1};
    this.scaleSpringConfig = {stiffness: 250, damping: 50, precision: 0.0001};

    /* Refs to later access each tile's position */
    this.tileRefs = [];
    this.lastOffsets = [0, 0, 0, 0];
    this.lastOffsetsUnchanged = [true, true, true, true];
    this.state = {
      /* An array of 4 numbers */
      numbers: Utils.shuffle(Utils.getRandomPuzzle(props.puzzles)),
      /* An array containing the 4 standard operators as strings */
      /* We shuffle the operators and take the first three to set the initial state of the operators */
      operators: Utils.shuffle(props.operators).slice(0, 3),
      /* An array where the first value represents the position of the left parenthesis, the second the right, and null represents no left/right paren */
      parentheses: [null, null],
      /* A hash containing various animation-related state data */
      animating: {
        tiles: [],
        /* The X-coordinate location of the cursor, when first clicking the tile. This value is relative to the page (e.g. 346 pixels from the left window border).
           This is subtracted from mouseLocation to determine how much to offset the active tile to draw the active tile under the mouse cursor */
        firstClickLocation: 0,
        /* The X-coordinate location of the cursor, always set to the most updated through onMouseMove handler */
        mouseLocation: 0,
        /* Describes whether the animation has finished before allowing another animation to start
        *  We don't need this property because we have isAnyTileAnimating() which checks the edge offsets to see if they match the original non-animating offsets*/
        //isAnimating: false,
      }
    };
    this.currentState = objectAssign({}, this.state);
    window.currentState = this.currentState;
    for (let i = 0; i < this.currentState.numbers.length; i++) {
      this.currentState.animating.tiles.push({
        /* Note this is actually set in onTileDownHandler */
        /* The index of the tile before the animation started */
        index: 0,
        /* The target index of the tile after the animation is complete */
        targetIndex: 0,
        /* Describes whether hitting the edge of this tile triggers a swap animation. Is set to false while the tile is already swapping */
        isSwappable: true,
        /* The state of the tile */
        state: Game.TILE_STATES.STATIC,
        /* The target offset the tile should snap to animate to */
        targetOffset: 0,
        isActive: false
      });
      this.justFinishedAnimation = false;
      window.getTileHtml = this.getTileHtml.bind(this);
      window.isAnimating = this.isAnimating.bind(this);
      window.isPostAnimating = this.isPostAnimating.bind(this);
      window.getStaticTileOffset = this.getStaticTileOffsetByTargetIndex.bind(this);
      window.getDynamicTileOffsetByTargetIndex = this.getDynamicTileOffsetByTargetIndex.bind(this);
      window.getDynamicTileByTargetIndex = this.getDynamicTileByTargetIndex.bind(this);
    }

    /* React's new ES6 class-based components do not have `this` autobinded */
    this.cycleOperator = this.cycleOperator.bind(this);
    this.animationMode = false;
  }

  componentDidMount() {
    // Enable events for this component
    heir.merge(this, new EventEmitter());
    /* Mouse move and up event listeners must be added outside the React element */

    // touchmove: a finger touches the screen
    window.addEventListener('touchmove', this.onTouchMove.bind(this));
    window.addEventListener('mousemove', this.onPointerMove.bind(this));
    // touchend: a finger is lifted off the screen`
    window.addEventListener('touchend', this.onPointerUp.bind(this));
    // touchcancel: too many fingers on screen, first finger touch canceled
    window.addEventListener('touchcancel', this.onPointerUp.bind(this));
    window.addEventListener('mouseup', this.onPointerUp.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('touchend', this.onPointerUp);
    window.removeEventListener('touchcancel', this.onPointerUp);
    window.removeEventListener('mouseup', this.onPointerUp);
  }

  // Returns a list of possible operators.
  getPossibleOperators() {
    let possibleOperators = this.props.operators;
    return possibleOperators;
  }

  // Returns the index of the current operator.
  getCurrentOperatorIndex(currentOperator) {
    return this.getPossibleOperators().indexOf(currentOperator);
  }

  /**
  * Modifies state {operators} to cycle the operator at the specified index.
  */
  cycleOperator(index, operator) {
    let operatorIndex = this.getCurrentOperatorIndex(operator);
    let numOperators = this.props.operators.length;
    let nextOperatorIndex = (operatorIndex + 1) % numOperators;
    let newOperators = this.currentState.operators.slice(0);
    newOperators[index] = this.props.operators[nextOperatorIndex];
    this.currentState.operators = newOperators;
    this.updateState();
  }

  computeResult() {
    let resultString = Utils.buildResultToCompute(this.currentState.numbers, this.currentState.operators, this.currentState.parentheses);
    return JSON.stringify(eval(eval(resultString)));
  }

  onDoubleClick(tileIndex) {
    this.parenthesize(tileIndex);
  }

  // Handles the logic of double clicking a tile to parenthesize it.
  // tileIndex is the index of the tile being clicked, a value between 0 and 3, inclusive
  parenthesize(tileIndex) {
    // If the clicked tile is parenthesized already, then unparenthesize it.
    if (tileIndex === this.currentState.parentheses[0] || tileIndex === this.currentState.parentheses[1]) {
      this.clearParentheses();
    } else if (this.currentState.parentheses[1] !== null) {
      // If there is a full set of parentheses, and the clicked tile is not a parenthesized tile,
      // then clear parentheses and left parenthesize the clicked tile.
      this.clearParentheses();
      this.setLeftParenthesis(tileIndex);
    } else {
      // If there is no left parenthesis, then set that.
      if (this.currentState.parentheses[0] === null) {
        this.setLeftParenthesis(tileIndex);
      } else {
        // If there is a left parenthesis, then if the clicked tile comes after
        // the left parenthesis, set the right parenthesis.
        if (tileIndex > this.currentState.parentheses[0]) {
          this.setRightParenthesis(tileIndex);
        } else {
          // Otherwise, the clicked tile comes before the left parenthesis, so
          // reset the parentheses state and set the left parenthesis on the left tile.
          this.clearParentheses();
          this.setLeftParenthesis(tileIndex);
        }
      }
    }
  }

  clearParentheses() {
    this.currentState.parentheses = [null, null];
  }

  setLeftParenthesis(tileIndex) {
    let _parentheses = this.currentState.parentheses.slice(0);
    _parentheses[0] = tileIndex;
    this.currentState.parentheses = _parentheses;
  }

  setRightParenthesis(tileIndex) {
    let _parentheses = this.currentState.parentheses.slice(0);
    _parentheses[1] = tileIndex;
    this.currentState.parentheses = _parentheses;
  }

  /**
   * Occurs when the mouse pointer or finger moves across the page.
   * @param pageX The cursor's current location relative to the page.
   */
  onPointerMove({pageX}) {
    // console.log(`Calling %conPointerMove(pageX: ${pageX}}).`, Utils.getConsoleStyle('code'));
    // Update the state with the current cursor's location to be used when rendering the active tile later
    this.currentState.animating.mouseLocation = pageX;
    this.updateState();
  }

  getAnimatingTile(index) {
    return this.currentState.animating.tiles[index];
  }

  onTouchMove(e) {
    log.debug('Called %conTouchMove.', Utils.getConsoleStyle('code'));
    this.onPointerMove(e.touches[0]);
  }

  /* Returns the animating tile that is being clicked on. */
  getActiveTile() {
    let foundTile = null;
    this.currentState.animating.tiles.forEach((tile, index) => {
      if (tile.isActive) {
        foundTile = tile;
        return;
      }
    });
    return foundTile;
  }

  isActiveTile(index) {
    let tile = this.currentState.animating.tiles[index];
    return tile && tile.isActive;
  }

  /**
   * Creates a copy of the `currentState` and requests this.state
   * to update to `currentState` by the next render() call.
   */
  updateState(options) {
    if (options && options.debug) {
     console.log('Updating state:', this.currentState);
    }
    this.setState(update(this.state, {$set: this.currentState}));
  }

  updateAnimatingTileByIndex(index, newTile) {
    let originalTile = this.currentState.animating.tiles[index];
    this.currentState.animating.tiles[index] = newTile;
    if (originalTile.number === newTile.number) {
     console.trace(`Updated tile ${originalTile.number}:`, JSON.stringify(originalTile), '=>', JSON.stringify(newTile));
    } else {
      console.trace(`Updated tile ${originalTile.number} -> ${newTile.number}:`, JSON.stringify(originalTile), '=>', JSON.stringify(newTile));
    }
    this.updateState();
  }

  findAnimatingTileIndexByTargetIndex(targetIndex) {
    return this.getDynamicTileByTargetIndex(targetIndex).index;
  }

  getDynamicTileByTargetIndex(targetTileIndex) {
    let foundTile = null;
    this.currentState.animating.tiles.forEach(tile => {
      if (tile.targetIndex == targetTileIndex) {
        foundTile = tile;
      }
    });
    return foundTile;
  }

  findAnimatingTileByIndex(tileIndex) {
    let foundTile = null;
    this.currentState.animating.tiles.forEach(tile => {
      if (tile.index == tileIndex) {
        foundTile = tile;
      }
    });
    return foundTile;
  }


  /*
    Called repeatedly by render().
    Calculates whether the edges of the active / neighboring tiles touch based on the current tile layout.
    If overlap is detected, switches the transitioning tile layout.
   */
  updateAnimationState() {
    let activeTile = this.getActiveTile();
    if (!activeTile) {
      return;
    }

    let leftNeighbor = this.getDynamicTileByTargetIndex(activeTile.targetIndex - 1);
    let rightNeighbor = this.getDynamicTileByTargetIndex(activeTile.targetIndex + 1);

    let leftNeighborExists = (leftNeighbor !== null);
    let rightNeighborExists = (rightNeighbor !== null);;

    // Get active, left neighbor, and right neighbor edge offsets
    let { left: activeTargetTileLeftDynamic, right: activeTargetTileRightDynamic } = this.getDynamicTileOffsetByTargetIndex(activeTile.targetIndex);
    let { left: activeTargetTileLeftStatic, right: activeTargetTileRightStatic } = this.getStaticTileOffsetByTargetIndex(activeTile.targetIndex);

    if (leftNeighborExists) {
      var { left: leftNeighborLeftStatic, right: leftNeighborRightStatic } = this.getStaticTileOffsetByTargetIndex(leftNeighbor.targetIndex);
      var { left: leftNeighborLeftDynamic, right: leftNeighborRightDynamic } = this.getDynamicTileOffsetByTargetIndex(leftNeighbor.targetIndex);
    }

    if (rightNeighborExists) {
      var { left: rightNeighborLeftStatic, right: rightNeighborRightStatic } = this.getStaticTileOffsetByTargetIndex(rightNeighbor.targetIndex);
      var { left: rightNeighborLeftDynamic, right: rightNeighborRightDynamic } = this.getDynamicTileOffsetByTargetIndex(rightNeighbor.targetIndex);
    }

    //console.log(`Tiles: Active (${activeTile.targetIndex}), Left (${leftNeighborExists ? leftNeighbor.targetIndex : 'N/A'}), Right (${rightNeighborExists ? rightNeighbor.targetIndex : 'N/A'})`);
    // Active tile crossed left neighbor
    if (leftNeighborExists &&
        activeTargetTileLeftDynamic < leftNeighborRightStatic &&
        this.getDynamicTileByTargetIndex(leftNeighbor.targetIndex).isSwappable) {
     console.log(`Active tile ${activeTile.number} crossed left neighbor ${leftNeighbor.number}.`);

      let futureLeftNeighbor = objectAssign({}, leftNeighbor, {
        targetIndex: activeTile.targetIndex,
        isSwappable: false,
        state: Game.TILE_STATES.TRANSITIONING,
        targetOffset: leftNeighbor.targetOffset + (activeTargetTileLeftStatic - leftNeighborLeftStatic),
        swapState: {
          swappedRightToLeft: false,
          neighborTargetTileIndex: activeTile.targetIndex,
          activeTargetTileIndex: leftNeighbor.targetIndex
        }
      });
     console.info(`Left Neighbor Offset: ${futureLeftNeighbor.targetOffset} = activeTargetTileLeftStatic (${activeTargetTileLeftStatic}) - leftNeighborLeftStatic (${leftNeighborLeftStatic}`);

      this.updateAnimatingTileByIndex(leftNeighbor.index, futureLeftNeighbor);

      let leftNeighborToActiveDistance = activeTile.targetOffset + (leftNeighborLeftStatic - activeTargetTileLeftStatic);

      let futureActiveTile = objectAssign({}, activeTile, {
        targetIndex: leftNeighbor.targetIndex,
        targetOffset: leftNeighborToActiveDistance
      });
      this.updateAnimatingTileByIndex(activeTile.index, futureActiveTile);
    }

    //console.log(`activeTargetTileRightDynamic: ${activeTargetTileRightDynamic}, rightNeighborLeftStatic: ${rightNeighborLeftStatic}, activeTargetTileRightDynamic > rightNeighborLeftStatic: ${activeTargetTileRightDynamic > rightNeighborLeftStatic} `)
    //console.log('rightNeighbor.targetIndex:', rightNeighbor.targetIndex);
    //console.log('getDynamicTileByTargetIndex(rightNeighbor.targetIndex):', JSON.stringify(this.getDynamicTileByTargetIndex(rightNeighbor.targetIndex)))
    if (rightNeighborExists &&
             activeTargetTileRightDynamic > rightNeighborLeftStatic &&
             this.getDynamicTileByTargetIndex(rightNeighbor.targetIndex).isSwappable) {
     console.log(`Active tile ${activeTile.number} crossed right neighbor ${rightNeighbor.number}.`);
      //console.log('Right neighbor:', rightNeighbor);

      let futureRightNeighbor = objectAssign({}, rightNeighbor, {
        targetIndex: activeTile.targetIndex,
        isSwappable: false,
        state: Game.TILE_STATES.TRANSITIONING,
        targetOffset: rightNeighbor.targetOffset + (activeTargetTileLeftStatic - rightNeighborLeftStatic),
        swapState: {
          swappedRightToLeft: true,
          neighborTargetTileIndex: activeTile.targetIndex,
          activeTargetTileIndex: rightNeighbor.targetIndex
        }
      });
      //console.log(`Right Neighbor Offset: ${futureRightNeighbor.targetOffset} = activeTileLeftStatic (${activeTargetTileLeftStatic}) - rightNeighborLeftStatic (${rightNeighborLeftStatic}`);
      this.updateAnimatingTileByIndex(rightNeighbor.index, futureRightNeighbor);
      let rightNeighborToActiveTileDistance = activeTile.targetOffset + (rightNeighborLeftStatic - activeTargetTileLeftStatic);

      let futureActiveTile = objectAssign({}, activeTile, {
        targetIndex: rightNeighbor.targetIndex,
        targetOffset: rightNeighborToActiveTileDistance
      });
      //console.log(`Active Tile Offset: ${rightNeighborToActiveTileDistance} = rightNeighborLeftStatic (${rightNeighborLeftStatic}) - activeTargetTileLeftStatic (${activeTargetTileLeftStatic}`);
      this.updateAnimatingTileByIndex(activeTile.index, futureActiveTile);
      //console.log('Active Tile Offset:', this.getActiveTile()['targetOffset']);
    }
    if (rightNeighborExists) {
      //console.warn(`(post-animation) Right tile at ${rightNeighbor.number} swappable:`, this.getAnimatingTile(rightNeighborIndex).isSwappable);
    }

    this.currentState.animating.tiles.forEach((neighborTile) => {
      if (!neighborTile.isSwappable) {
        this.allowIsSwappableIfReady(neighborTile.swapState.swappedRightToLeft, neighborTile.swapState.neighborTargetTileIndex, neighborTile.swapState.activeTargetTileIndex);
      }
    });
  }

  allowIsSwappableIfReady(swappedRightToLeft, neighborTileTargetIndex, activeTileTargetIndex) {
    //console.log(`Swap Function: Right -> Left (${swappedRightToLeft}), Neighbor Index (${neighborTileTargetIndex}), Active Tile Index (${activeTileTargetIndex})`);
    let neighbor = this.getDynamicTileByTargetIndex(neighborTileTargetIndex);
    let activeTile = this.getDynamicTileByTargetIndex(activeTileTargetIndex);
    let { left: neighborLeftAnimating, right: neighborRightAnimating } = this.getDynamicTileOffsetByTargetIndex(neighborTileTargetIndex);
    //console.log(`neighborLeftAnimating (${neighborLeftAnimating}), neighborRightAnimating (${neighborRightAnimating}) for neighbor tile ${neighborTargetTileIndex}`);
    let { left: activeTargetTileLeftAnimating, right: activeTargetTileRightAnimating } = this.getDynamicTileOffsetByTargetIndex(activeTileTargetIndex);
    //console.log(`activeTileLeftAnimating (${activeTileLeftAnimating}), activeTileRightAnimating (${activeTileRightAnimating}) for active tile ${activeTargetTileIndex}`);
    if (swappedRightToLeft) {
      //console.log(`neighborRightAnimating (${neighborRightAnimating}) < activeTileLeftAnimating (${activeTileLeftAnimating}) = ${neighborRightAnimating < activeTileLeftAnimating}`);
      if (neighborRightAnimating < activeTargetTileLeftAnimating) {
       console.warn(`Setting neighbor tile ${neighborTileTargetIndex} to be swappable.`);
        this.updateAnimatingTileByIndex(neighbor.index, objectAssign({}, neighbor, {
          isSwappable: true,
          swapState: null
        }));
      }
    } else {
      if (neighborLeftAnimating > activeTargetTileRightAnimating) {
        //console.log(`neighborLeftAnimating (${neighborLeftAnimating}) < activeTileRightAnimating (${activeTileRightAnimating}) = ${neighborLeftAnimating < activeTileRightAnimating}`);
       console.warn(`Setting neighbor tile ${neighborTileTargetIndex} to be swappable.`);
        this.updateAnimatingTileByIndex(neighbor.index, objectAssign({}, neighbor, {
          isSwappable: true,
          swapState: null
        }));
      }
    }
  }

  /*
    Given the tile index, returns the left and right edge offsets of the tile not affected by transforms.
    This has no real ByTargetIndex variant
   */
  getStaticTileOffsetByTargetIndex(tileIndex) {
    if (tileIndex < 0 || tileIndex > this.tileRefs.length) {
      return {
        left: null,
        right: null
      }
    }
    let tileRef = this.tileRefs[tileIndex];
    if (tileRef) {
      let domNode = ReactDOM.findDOMNode(tileRef);
      return {
        left: domNode.offsetLeft,
        right: domNode.offsetLeft + domNode.offsetWidth
      }
    } else {
      return {
        left: null,
        right: null
      };
    }
  }

  /*
   Given the tile index, returns the accurate-as-displayed left and right edge offsets from the left of the viewport.
   The tiles checked are not the original tiles, but the temporary in-animation tiles number layout.
   */
  getDynamicTileOffsetByTargetIndex(targetTileIndex) {
    if (targetTileIndex < 0 || targetTileIndex > this.tileRefs.length) {
      return {
        left: null,
        right: null
      }
    }
    let dynamicTile = this.getDynamicTileByTargetIndex(targetTileIndex);
    if (!dynamicTile) {
     console.trace('Dynamic tile not found for targetTileIndex:', targetTileIndex);
      return;
    }
    let tileIndex = dynamicTile.index;
    let tileRef = this.tileRefs[tileIndex];
    if (tileRef) {
      let domNode = ReactDOM.findDOMNode(tileRef);
      let rect = domNode.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.left + rect.width
      }
    } else {
      return {
        left: null,
        right: null
      };
    }
  }

  isAnimating() {
    let originalTileOffsets = [];
    // Check whether each tile has a CSS transform translate3d property that isn't 0
    for (let i = 0; i < this.tileRefs.length; i++) {
      let tileRef = this.tileRefs[i];
      if (tileRef) {
        let domNode = ReactDOM.findDOMNode(tileRef);
        let transformStyle = domNode.style.transform;
        // Get "1px, 0px, 0px" from "transform3d(1px, 0px, 0px) scale(1.1)"
        transformStyle = transformStyle.substring(transformStyle.indexOf('(') + 1, transformStyle.indexOf(')'));
        // Get "1px,0px,0px" from "1px, 0px, 0px"
        transformStyle = transformStyle.replace(/ /g, '');
        // Get "1,0,0" from "1px,0px,0px"
        transformStyle = transformStyle.replace(/px/g, '');
        // Get the first number
        let transformXOffset = Number(transformStyle.split(',')[0])
        if (transformXOffset !== 0) {
          return true;
        }
      } else {
        return false;
      }
    }
    // Check that the mouse isn't down
    this.currentState.animating.tiles.forEach((tile, index) => {
      if (tile.isActive) {
        return true;
      }
    });
    return false;
  }

  isPostAnimating() {
    for (let i = 0; i < this.currentState.numbers.length; i++) {
      let staticOffset = this.getStaticTileOffsetByTargetIndex(i).left;
      let dynamicOffset = this.getDynamicTileOffsetByTargetIndex(i).left;
      if (Math.abs(dynamicOffset - staticOffset) > 2) {
        return true;
      }
    }
    return false;
  }

  /*
    Returns true if the tile's left offset matches any of the pre-transform left offsets.
   */
  isTileTransitioning(tileIndex) {
    let originalTileOffsets = [];
    for (let i = 0; i < this.tileRefs.length; i++) {
      originalTileOffsets.push(this.getStaticTileOffsetByTargetIndex(i)['left']);
    }
    let activeLeftOffset = this.getDynamicTileOffsetByTargetIndex(tileIndex)['left'];
    return originalTileOffsets.indexOf(activeLeftOffset) == -1;
  }

  /**
   * Occurs when the mouse pointer or finger selects the tile.
   * @param tileIndex The index of the tile that was selected.
   * @param pageX
   */
  onTileDownHandler(tileIndex, {pageX: mouseLocation}) {
   console.log(`Calling %conTileDownHandler(tileIndex: ${tileIndex}, mouseLocation: ${mouseLocation}).`, Utils.getConsoleStyle('code'));

    // TODO: Wait for the tiles to drift back and finish animating (stop moving) before allowing another animation to take place
    if (this.isAnimating()) {
     console.log('isAnimating() is true. Return');
      return;
    }
    this.animationMode = true;

    let tiles = [];
    this.currentState.numbers.forEach((number, index) => {
      if (tileIndex == index) {
        tiles.push({
          index: index,
          number: number,
          targetIndex: index,
          isSwappable: true,
          state: Game.TILE_STATES.STATIC,
          targetOffset: 0,
          isActive: true
        })
      } else {
        tiles.push({
          index: index,
          number: number,
          targetIndex: index,
          isSwappable: true,
          state: Game.TILE_STATES.STATIC,
          targetOffset: 0
        });
      }
    });

    this.currentState.animating = {
      firstClickLocation: mouseLocation,
      mouseLocation: mouseLocation,
      tiles: tiles
    };
    this.updateState();
  }

  onTouchStartHandler(tileIndex, e) {
    console.log(`Called %conTouchStartHandler(tileIndex: ${tileIndex}, e: ${e})`, Utils.getConsoleStyle('code'));
    this.onTileDownHandler(tileIndex, {pageX: e.touches[0].pageX});
    e.preventDefault();
  }

  onPointerUp(e) {
   console.log(`Calling %conPointerUp(event: ${e}}).`, Utils.getConsoleStyle('code'));
    // TODO: Do not wait for animation to complete, use targetIndex to pre-emptively swap the tiles in a temp place and calculate the result to make the game seem faster
    //       In other words, the result should update immediately after the user releases their cursor and should not wait for the animation to finish
    let activeTile = this.getActiveTile();
    if (activeTile) {
      activeTile.isActive = false;
      this.updateAnimatingTileByIndex(activeTile.index, activeTile);

      function check() {
        if (!isPostAnimating()) {
         console.log('Not post animating anymore.');
          let finalNumbersHash = {};
          let finalNumbers = [];
         console.log('Numbers before swap:', this.currentState.numbers);
          this.currentState.animating.tiles.forEach(tile => {
            finalNumbersHash[tile.targetIndex] = tile.number;
          });
          for (let i = 0; i < this.currentState.numbers.length; i++) {
            finalNumbers.push(finalNumbersHash[i]);
          }
         console.log('Numbers after swap:', finalNumbers);
          this.currentState.numbers = finalNumbers;
          this.animationMode = false;
          this.justFinishedAnimation = true;
          setTimeout(() => {
            this.updateState({debug: true});
            this.justFinishedAnimation = false;
            document.body.style.display = 'none';
            document.body.offsetHeight;
            document.body.style.display = '';
          }, 0);
         }
         else {
          window.requestAnimationFrame(check.bind(this));
        }
      }

      window.requestAnimationFrame(check.bind(this));
    }
  }

  getTileZIndex(renderingTileIndex) {
    // If the current tile being rendered is held down and moved, or mouse was released and last held tile is moving back to original position
    if (this.isActiveTile(renderingTileIndex)) {
      return 99999;
    } else {
      return 100;
    }
  }

  getTileHtml(tileIndex) {
    let tileValue = this.currentState.numbers[tileIndex];
    let tileStyle = this.getTileMotionStyle(tileIndex);
    let html =
      <Motion style={tileStyle} key={tileIndex}>
        {({scale, shadow, offsetX}) => {
            if (this.lastOffsets[tileIndex] === offsetX) {
                this.lastOffsetsUnchanged[tileIndex] = true;
            } else {
              this.lastOffsetsUnchanged[tileIndex] = false;
            }
            this.lastOffsets[tileIndex] = offsetX;
          return <Tile onMouseDownHandler={this.onTileDownHandler.bind(this, tileIndex)}
                onTouchStartHandler={this.onTouchStartHandler.bind(this, tileIndex)}
                onDoubleClick={this.onDoubleClick.bind(this, tileIndex)}
                value={tileValue} ref={(ref) => this.tileRefs[tileIndex] = ref}
                customStyles={{
                  boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                  transform: `translate3d(${offsetX}px, 0, 0) scale(${scale})`,
                  zIndex: this.getTileZIndex(tileIndex),
                }}/>;
        }}
      </Motion>;
    return html;
  }

  getTileMotionStyle(tileIndex) {
    let { firstClickLocation, mouseLocation } = this.currentState.animating;
    // console.log(`Calling %cgetTileMotionStyle(numIndexPressed: ${numIndexPressed}), mouseLocation: ${mouseLocation}.`, Utils.getConsoleStyle('code'));
    let inactiveTileOffset = 0;
    let animatingTile = this.currentState.animating.tiles[tileIndex];
    if (animatingTile && this.animationMode) {
      inactiveTileOffset = animatingTile.targetOffset;
    }
    if (this.isActiveTile(tileIndex)) {
      return {
        scale: spring(1.1, this.scaleSpringConfig),
        shadow: spring(16, this.scaleSpringConfig),
        offsetX: mouseLocation - firstClickLocation,
      };
    } else {
      return {
        scale: spring(1, this.scaleSpringConfig),
        shadow: spring(1, this.scaleSpringConfig),
        offsetX: this.justFinishedAnimation ? inactiveTileOffset : spring(inactiveTileOffset, this.springConfig)
      };
    }
  }

  getOperatorHtml(index) {
    let numNumbers = this.currentState.numbers.length;
    if (index == numNumbers - 1)
      return;

    return <Operator
      index={index}
      operator={this.currentState.operators[index]}
      possibleOperators={this.props.operators}
      cycleOperatorFn={this.cycleOperator}
      />;
  }

  getParensHtml(direction, index) {
    let parensIndex = this.currentState.parentheses[direction == 'left' ? 0 : 1];
    if (parensIndex == index) {
      return <Parenthesis
        index={parensIndex}
        type={direction} />;
    }
  }

  /**
   * Occurs after render() is called. Called by React.
   */
  componentDidUpdate(prevProps, prevState){
    this.currentState = objectAssign({}, this.state);
    if (this.isAnimating()) {
      this.updateAnimationState();
    }
  }

  render() {
    let result = this.computeResult();

    let html = (
      <section className="flexible rows horizontally-centered vertically-centered game">
        {/* Do this 4 times .. */}
        { range(this.currentState.numbers.length).map( index => {
          return [
            // Render left parenthesis
            this.getParensHtml('left', index),
            // Render number tile
            this.getTileHtml(index),
            // Render right parenthesis
            this.getParensHtml('right', index),
            // Render operator
            this.getOperatorHtml(index),
          ];
        })}
        <EqualsSign/>
        <Result value={Utils.cleanComputedResult(result)}/>
      </section>
    );
    return html;
  }
}

Game.propTypes = {
  /* An array of 4 numbers */
  puzzles: React.PropTypes.array.isRequired,
  /* An array containing the allowed mathematical operators */
  operators: React.PropTypes.array.isRequired
};

export default Game;
