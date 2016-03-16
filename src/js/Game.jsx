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
      ACTIVE: 'active',
    }
  }

  constructor(props) {
    super(props);

    /* Default spring physics */
    this.springConfig = {stiffness: 300, damping: 50};

    /* Refs to later access each tile's position */
    this.tileRefs = [];
    this.state = {
      /* An array of 4 numbers */
      numbers: Utils.shuffle(props.puzzle),
      /* An array containing the 4 standard operators as strings */
      /* We shuffle the operators and take the first three to set the initial state of the operators */
      operators: Utils.shuffle(props.operators).slice(0, 3),
      /* An array where the first value represents the position of the left parenthesis, the second the right, and null represents no left/right paren */
      parentheses: [0, 2],
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
    for (let i = 0; i < this.state.numbers.length; i++) {
      this.state.animating.tiles.push({
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
    }

    /* React's new ES6 class-based components do not have `this` autobinded */
    this.cycleOperator = this.cycleOperator.bind(this);
  }

  componentDidMount() {
    // Enable events for this component
    heir.merge(this, new EventEmitter());
    /* Mouse move and up event listeners must be added outside the React element */

    // touchmove: a finger touches the screen
    window.addEventListener('touchmove', this.onPointerMove.bind(this));
    window.addEventListener('mousemove', this.onPointerMove.bind(this));
    // touchend: a finger is lifted off the screen`
    window.addEventListener('touchend', this.onPointerUp.bind(this));
    // touchcancel: too many fingers on screen, first finger touch canceled
    window.addEventListener('touchcancel', this.onPointerUp.bind(this));
    window.addEventListener('mouseup', this.onPointerUp.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.onPointerMove);
    window.removeEventListener('mousemove', this.onPointerMove);
    window.removeEventListener('touchend', this.onPointerUp);
    window.removeEventListener('touchcancel', this.onPointerUp);
    window.removeEventListener('mouseup', this.onPointerUp);
  }

  componentWillReceiveProps(nextProps) {
    this.emit('gameReset', nextProps);
    this.setState({
      numbers: Utils.shuffle(nextProps.puzzle),
      parentheses: [null, null]
    });
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
    let newOperators = this.state.operators.slice(0);
    newOperators[index] = this.props.operators[nextOperatorIndex];
    this.setState({
      operators: newOperators
    });
  }

  computeResult() {
    let resultString = Utils.buildResultToCompute(this.state.numbers, this.state.operators, this.state.parentheses);
    return JSON.stringify(eval(eval(resultString)));
  }

  getAnimatingTile(index) {
    return this.state.animating.tiles[index];
  }

  getActiveAnimatingTile() {
    let foundTile = null;
    this.state.animating.tiles.forEach((tile, index) => {
      if (tile.isActive) {
        foundTile = tile;
        return;
      }
    });
    return foundTile;
  }

  isActiveTile(index) {
    let tile = this.state.animating.tiles[index];
    return tile && tile.isActive;
  }

  updateAnimatingTile(index, tile) {
    let originalTiles = this.state.animating.tiles;
    let newTiles = originalTiles.slice(0);
    newTiles[index] = tile;
      this.setState(update(this.state, {
      animating: {
        tiles: {$set: newTiles}
      }
    }));
  }
// calcuate based on where mouse's pageX is relative to the known tile offsetLeft (from getTileLeftEdge), these values are unaffected by transform

  /*
    Called repeatedly by render().
    Calculates whether the edges of the active / neighboring tiles touch based on the current tile layout.
    If overlap is detected, switches the transitioning tile layout.
   */
  updateAnimationState() {
    let activeTile = this.getActiveAnimatingTile();
    if (!activeTile) {
      return;
    }

    let activeTileIndex = activeTile.targetIndex;
    let leftNeighborIndex = activeTileIndex - 1;
    let rightNeighborIndex = activeTileIndex + 1;

    let leftNeighborExists = activeTileIndex > 0;
    let rightNeighborExists = activeTileIndex < this.tileRefs.length - 1;

    let leftNeighbor = this.getAnimatingTile(leftNeighborIndex);
    let rightNeighbor = this.getAnimatingTile(rightNeighborIndex);

    // Get active, left neighbor, and right neighbor edge offsets
    let { left: activeTileLeftAnimating, right: activeTileRightAnimating } = this.getAnimatingTileOffset(activeTileIndex);
    let { left: activeTileLeftStatic, right: activeTileRightStatic } = this.getStaticTileOffset(activeTileIndex);
    let { left: leftNeighborLeftStatic, right: leftNeighborRightStatic } = this.getStaticTileOffset(leftNeighborIndex);
    let { left: rightNeighborLeftStatic, right: rightNeighborRightStatic } = this.getStaticTileOffset(rightNeighborIndex);

    //console.group();
    //console.log('Active Tile Index:', activeTileIndex);
    //console.log('Active Tile Animating Edge Offsets:', { left: activeTileLeftAnimating, right: activeTileRightAnimating });
    //console.log('Active Tile Static Edge Offsets:', { left: activeTileLeftStatic, right: activeTileRightStatic });
    //console.log('Left Neighbor Static Edge Offsets:', { left: leftNeighborLeftStatic, right: leftNeighborRightStatic });
    //console.log('Right Neighbor Static Edge Offsets:', { left: rightNeighborLeftStatic, right: rightNeighborRightStatic });
    //console.groupEnd();

    if (leftNeighborExists) {
      console.warn("leftNeighbor: ", leftNeighborIndex, this.getAnimatingTile(leftNeighborIndex).isSwappable);
    }
    // Active tile crossed left neighbor
    if (leftNeighborExists &&
        activeTileLeftAnimating < leftNeighborRightStatic &&
        this.getAnimatingTile(leftNeighborIndex).isSwappable) {
      console.log(`Active tile ${activeTileIndex} crossed left neighbor ${leftNeighborIndex}.`);

      let newLeftNeighborTargetIndex = activeTileIndex;
      let newLeftNeighborIsSwappable = false;
      let newLeftNeighborState = Game.TILE_STATES.TRANSITIONING;
      let newLeftNeighborTargetOffset = activeTileLeftStatic - leftNeighborLeftStatic;

      this.updateAnimatingTile(leftNeighborIndex, objectAssign(leftNeighbor, {
        targetIndex: newLeftNeighborTargetIndex,
        isSwappable: newLeftNeighborIsSwappable,
        state: newLeftNeighborState,
        targetOffset: newLeftNeighborTargetOffset
      }));

      let oldLeftNeighborIndex = leftNeighborIndex;
      let oldLeftNeighborOffset = activeTileLeftStatic - leftNeighborLeftStatic;

      this.updateAnimatingTile(activeTileIndex, objectAssign(activeTile, {
        targetIndex: oldLeftNeighborIndex,
        targetOffset: oldLeftNeighborOffset
      }));
    }
    else if (rightNeighborExists &&
             activeTileRightAnimating > rightNeighborLeftStatic &&
             this.getAnimatingTile(rightNeighborIndex).isSwappable) {
      console.log(`Active tile ${activeTileIndex} crossed right neighbor ${rightNeighborIndex}.`);

      let newRightNeighborTargetIndex = activeTileIndex;
      let newRightNeighborIsSwappable = false;
      let newRightNeighborState = Game.TILE_STATES.TRANSITIONING;
      let newRightNeighborTargetOffset = activeTileLeftStatic - rightNeighborLeftStatic;

      console.warn('before:', rightNeighborIndex, this.getAnimatingTile(rightNeighborIndex).isSwappable);
      this.updateAnimatingTile(rightNeighborIndex, objectAssign(rightNeighbor, {
        targetIndex: newRightNeighborTargetIndex,
        isSwappable: newRightNeighborIsSwappable,
        state: newRightNeighborState,
        targetOffset: newRightNeighborTargetOffset
      }));
      console.warn('after:', rightNeighborIndex, this.getAnimatingTile(rightNeighborIndex).isSwappable);

      let oldRightNeighborIndex = rightNeighborIndex;
      let oldRightNeighborOffset = 300;

      this.updateAnimatingTile(activeTileIndex, objectAssign(activeTile, {
        targetIndex: oldRightNeighborIndex,
        targetOffset: oldRightNeighborOffset
      }));
      //console.log('Active Tile Offset:', this.getActiveAnimatingTile()['targetOffset']);
    }
    if (rightNeighborExists) {
      console.warn('final:', rightNeighborIndex, this.getAnimatingTile(rightNeighborIndex).isSwappable);
    }
  }

  /*
    Given the tile index, returns the left and right edge offsets of the tile not affected by transforms.
   */
  getStaticTileOffset(tileIndex) {
    if (tileIndex < 0 || tileIndex > this.tileRefs.length) {
      return {
        left: null,
        right: null
      }
    }
    let inAnimationTileIndex = this.state.animating.tiles[tileIndex].targetIndex;
    let tileRef = this.tileRefs[inAnimationTileIndex];
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
  getAnimatingTileOffset(tileIndex) {
    let inAnimationTileIndex = this.state.animating.tiles[tileIndex].targetIndex;
    let tileRef = this.tileRefs[inAnimationTileIndex];
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
    for (let i = 0; i < this.tileRefs.length; i++) {
      let staticOffset = this.getStaticTileOffset(i)['left'];
      let animatingOffset = this.getAnimatingTileOffset(i)['left'];
      if (staticOffset !== animatingOffset) {
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
      originalTileOffsets.push(this.getStaticTileOffset(i)['left']);
    }
    let activeLeftOffset = this.getAnimatingTileOffset(tileIndex)['left'];
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
      return;
    }

    let tiles = [];
    this.state.numbers.forEach((number, index) => {
      if (tileIndex == index) {
        tiles.push({
          index: index,
          targetIndex: index,
          isSwappable: true,
          state: Game.TILE_STATES.STATIC,
          targetOffset: 0,
          isActive: true
        })
      } else {
        tiles.push({
          index: index,
          targetIndex: index,
          isSwappable: true,
          state: Game.TILE_STATES.STATIC,
          targetOffset: 0
        });
      }
    });
    this.setState(update(this.state, {
      animating: {
        firstClickLocation: {$set: mouseLocation},
        mouseLocation: {$set: mouseLocation},
        tiles: { $set: tiles },
      }
    }));
  }

  /**
   * Occurs when the mouse pointer or finger moves across the page.
   * @param pageX The cursor's current location relative to the page.
   */
  onPointerMove({pageX}) {
    //console.log(`Calling %conPointerMove(pageX: ${pageX}}).`, Utils.getConsoleStyle('code'));
    // Update the state with the current cursor's location to be used when rendering the active tile later
    this.setState(update(this.state, {
      animating: {
        mouseLocation: {$set: pageX}
      }
    }));
  }

  onPointerUp(e) {
    console.log(`Calling %conPointerUp(event: ${e}}).`, Utils.getConsoleStyle('code'));
    // TODO: Do not wait for animation to complete, use targetIndex to pre-emptively swap the tiles in a temp place and calculate the result to make the game seem faster
    //       In other words, the result should update immediately after the user releases their cursor and should not wait for the animation to finish
    let activeTile = this.getActiveAnimatingTile();
    activeTile.isActive = false;
    this.updateAnimatingTile(activeTile.index, activeTile)
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
    let tileValue = this.state.numbers[tileIndex];
    let tileStyle = this.getTileMotionStyle(tileIndex);
    let html =
      <Motion style={tileStyle} key={tileIndex}>
        {({scale, shadow, offsetX}) => {
          //console.log(`Tile ${tileIndex}: Offset ${offsetX}px.`);
          return <Tile onMouseDownHandler={this.onTileDownHandler.bind(this, tileIndex)}
                onTouchStartHandler={this.onTileDownHandler.bind(this, tileIndex)}
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
    let { firstClickLocation, mouseLocation } = this.state.animating;
    //console.log(`Calling %cgetTileMotionStyle(numIndexPressed: ${numIndexPressed}), mouseLocation: ${mouseLocation}.`, Utils.getConsoleStyle('code'));
    let inactiveTileOffset = 0;
    let animatingTile = this.state.animating.tiles[tileIndex];
    if (animatingTile) {
      inactiveTileOffset = animatingTile.targetOffset;
    }
    if (this.isActiveTile(tileIndex)) {
      return {
        scale: spring(1.1, this.springConfig),
        shadow: spring(16, this.springConfig),
        offsetX: mouseLocation - firstClickLocation,
      };
    } else {
      return {
        scale: spring(1, this.springConfig),
        shadow: spring(1, this.springConfig),
        offsetX: spring(inactiveTileOffset, this.springConfig),
      };
    }
  }

  getOperatorHtml(index) {
    let numNumbers = this.state.numbers.length;
    if (index == numNumbers - 1)
      return;

    return <Operator
      index={index}
      operator={this.state.operators[index]}
      possibleOperators={this.props.operators}
      cycleOperatorFn={this.cycleOperator}
      />;
  }

  getParensHtml(direction, index) {
    let parensIndex = this.state.parentheses[direction == 'left' ? 0 : 1];
    if (parensIndex == index) {
      return <Parenthesis
        index={parensIndex}
        type={direction}
        />;
    }
  }

  /**
   * Occurs after render() is called. Called by React.
   */
  componentDidUpdate(prevProps, prevState){
    if (this.isAnimating()) {
      this.updateAnimationState();
    }
  }

  render() {
    let result = this.computeResult();

    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        {/* Do this 4 times .. */}
        { range(this.state.numbers.length).map( index => {
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
  }
}

Game.propTypes = {
  /* An array of 4 numbers */
  puzzle: React.PropTypes.array.isRequired,
  /* An array containing the allowed mathematical operators */
  operators: React.PropTypes.array.isRequired
};

export default Game;
