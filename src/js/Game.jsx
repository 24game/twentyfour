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
var debounce = require('debounce');

class Game extends React.Component {

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
      anim: {
        /* The index of the tile currently being clicked (-1 if no tile is being clicked) */
        numIndexPressed: -1,
        /* The index of the last number that was pressed */
        lastNumIndexPressed: -1,
        /* The location of the cursor, when first clicking the tile. This is subtracted from mouseX after */
        tileClickMouseX: 0,
        /* The location of the cursor */
        mouseX: 0,
        /* Between tile down and pointer up, represents the mapping of tile index to new tile index.
        *  [0, 1, 2, 3] is the default which means the tile indices mirror the original exactly
        *  For example, the first tile correponds to the first tile, the second corresponds to the first
        *  [1, 0, 2, 3] would mean the first and second tile are swapped
        *  That is, the first tile correponds to the second, the second corresponds to the first */
        indices: [0, 1, 2, 3],
        /* The springified animation offsets for each tile */
        offsets: [0, 0, 0, 0]
      }

    };

    /* React's new ES6 class-based components do not have `this` autobinded */
    this.cycleOperator = this.cycleOperator.bind(this);
  }

  componentDidMount() {
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
    this.setState({
      numbers: Utils.shuffle(nextProps.puzzle)
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
    return "'" + eval(this.state.numbers[0] +
      Utils.cleanOperators(this.state.operators[0]) +
      this.state.numbers[1] +
      Utils.cleanOperators(this.state.operators[1]) +
      this.state.numbers[2] +
      Utils.cleanOperators(this.state.operators[2]) +
      this.state.numbers[3]) + "''";
  }

  onPointerMove({pageX}) {
    //console.log(`Calling %conPointerMove(pageX: ${pageX}}).`, Utils.getConsoleStyle('code'));
    let { tileClickMouseX } = this.state.anim;
    this.setState(update(this.state, {
      anim: {
        /* The current mouse position, relative to the page (layout viewport) */
        mouseX: {$set: pageX}
      }
    }));
    this.updateTransitioningTileOffsets()
  }
// calcuate based on where mouse's pageX is relative to the known tile offsetLeft (from getTileLeftEdge), these values are unaffected by transform

  /*
    Called repeatedly by render().
    Calculates whether the edges of the active / neighboring tiles touch based on the current tile layout.
    If overlap is detected, switches the transitioning tile layout.
   */
  updateTransitioningTileOffsets() {
    let activeTileIndex = this.state.anim.numIndexPressed;
    let leftNeighborIndex = activeTileIndex - 1;
    let rightNeighborIndex = activeTileIndex + 1;

    let leftNeighborExists = activeTileIndex > 0;
    let rightNeighborExists = activeTileIndex < this.tileRefs.length - 1;

    // Get active, left neighbor, and right neighbor edge offsets
    let { left: activeTileLeftDynamic, right: activeTileRightDynamic } = this.getTileEdgesDynamic(activeTileIndex);
    let { left: activeTileLeftStatic, right: activeTileRightStatic } = this.getTileEdgesStatic(activeTileIndex);
    let { left: leftNeighborLeftStatic, right: leftNeighborRightStatic } = this.getTileEdgesStatic(leftNeighborIndex);
    let { left: rightNeighborLeftStatic, right: rightNeighborRightStatic } = this.getTileEdgesStatic(rightNeighborIndex);

    //console.group();
    //console.log('Active Tile Index:', activeTileIndex);
    //console.log('Active Tile Dynamic Edge Offsets:', { left: activeTileLeftDynamic, right: activeTileRightDynamic });
    //console.log('Active Tile Static Edge Offsets:', { left: activeTileLeftStatic, right: activeTileRightStatic });
    //console.log('Left Neighbor Static Edge Offsets:', { left: leftNeighborLeftStatic, right: leftNeighborRightStatic });
    //console.log('Right Neighbor Static Edge Offsets:', { left: rightNeighborLeftStatic, right: rightNeighborRightStatic });
    //console.groupEnd();

    let indices = this.state.anim.indices;
    let offsets = this.state.anim.offsets.slice(0);
    let tempNumbersLayoutNew = indices;

    // Active tile crossed left neighbor
    if (leftNeighborExists &&
        activeTileLeftDynamic < leftNeighborRightStatic &&
        !this.isTileTransitioning(leftNeighborIndex)) {
      // Swap the temp tiles layout
      console.log('Active tile crossed left neighbor');
      tempNumbersLayoutNew = Utils.swap(indices, activeTileIndex, leftNeighborIndex);
      offsets[leftNeighborIndex] = (activeTileLeftStatic - leftNeighborLeftStatic);
    }
    else if (rightNeighborExists &&
             activeTileRightDynamic > rightNeighborLeftStatic &&
             !this.isTileTransitioning(rightNeighborIndex)) {
      console.log('Active tile crossed right neighbor');
      // Swap the temp tiles layout
      tempNumbersLayoutNew = Utils.swap(indices, activeTileIndex, rightNeighborIndex);
      offsets[rightNeighborIndex] = activeTileLeftStatic - rightNeighborLeftStatic;
      console.log('activeTileLeftStatic:', activeTileLeftStatic);
      console.log('leftNeighborLeftStatic:', leftNeighborLeftStatic);
      console.log('Moving tile', rightNeighborIndex, 'left by', -(activeTileLeftStatic - leftNeighborLeftStatic), 'px');
    }

    if (tempNumbersLayoutNew != indices) {
      this.setState(update(this.state, {
        anim: {
          /* The current mouse position, relative to the page (layout viewport) */
          indices: {$set: tempNumbersLayoutNew},
          offsets: {$set: offsets}
        }
      }));
      console.info('Temp Indices:', this.state.anim.indices);
      console.info('Offsets:', this.state.anim.offsets);
    }
  }

  /*
    Given the tile index, returns the left and right edge offsets of the tile not affected by transforms.
   */
  getTileEdgesStatic(tileIndex) {
    if (tileIndex < 0 || tileIndex > this.tileRefs.length) {
      return {
        left: null,
        right: null
      }
    }
    let tempTileIndices = this.state.anim.indices;
    let inAnimationTileIndex = tempTileIndices[tileIndex];
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
  getTileEdgesDynamic(tileIndex) {
    let tempTileIndices = this.state.anim.indices;
    let inAnimationTileIndex = tempTileIndices[tileIndex];
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

  /*
    Returns true if the tile's left offset matches any of the pre-transform left offsets.
   */
  isTileTransitioning(tileIndex) {
    let originalTileOffsets = [];
    for (let i = 0; i < this.tileRefs.length; i++) {
      originalTileOffsets.push(this.getTileEdgesStatic(i)['left']);
    }
    let activeLeftOffset = this.getTileEdgesDynamic(tileIndex)['left'];
    return originalTileOffsets.indexOf(activeLeftOffset) == -1;
  }

  onPointerUp(e) {
    console.log(`Calling %conPointerUp(event: ${e}}).`, Utils.getConsoleStyle('code'));
    let lastNumIndexPressed = this.state.anim.numIndexPressed;
    // Finally apply our temp tile indices to the real tile state
    console.log('Old Numbers:', this.state.numbers);
    let tempTileIndices = this.state.anim.indices;
    let numberState = this.state.numbers.slice(0);
    tempTileIndices.forEach((value, index) => {
      console.log(`Replacing numbers[${index}] with numbers[${value}].`);
      console.log('Old Numbers:', numberState);
      numberState[index] = this.state.numbers[value];
      console.log('New Numbers (after replace):', numberState);
    });
    this.setState(update(this.state, {
      numbers: {$set: numberState}
    }));
    console.log('New Numbers (after all replacements):', this.state.numbers);

    this.setState(update(this.state, {
      anim: {
        // No tile is being pressed anymore
        numIndexPressed: {$set: -1},
        lastNumIndexPressed: {$set: lastNumIndexPressed},
        // Reset the offset to 0 so the tile animates back to its starting position
        tileClickMouseX: {$set: 0},
        mouseX: {$set: 0},
        offsets: {$set: [0, 0, 0, 0]}
      }
    }));
  }

  onTileDownHandler(tileIndex, {pageX}) {
    console.log(`Calling %conTileDownHandler(tileIndex: ${tileIndex}, pageX: ${pageX}).`, Utils.getConsoleStyle('code'));
    this.setState(update(this.state, {
      anim: {
        numIndexPressed: {$set: tileIndex},
        lastNumIndexPressed: {$set: tileIndex},
        tileClickMouseX: {$set: pageX},
        mouseX: {$set: pageX},
        numbers: {$set: this.state.numbers}
      }
    }));
  }

  getTileZIndex(renderingTileIndex) {
    // If the current tile being rendered is held down and moved, or mouse was released and last held tile is moving back to original position
    let { numIndexPressed, lastNumIndexPressed } = this.state.anim;
    if (renderingTileIndex == numIndexPressed || renderingTileIndex == lastNumIndexPressed) {
      return 99999;
    } else {
      return 100;
    }
  }

  springTest() {
    if (!this.springTestValue) {
      this.springTestValue = 0;
    }
    if (this.springTestValue < 16) {
      this.springTestValue = spring(1.1, this.springConfig)
    } else {
      this.springTestValue = spring(16, this.springConfig);
    }
    console.log('Spring Test Value:', this.springTestValue);
  }

  getTileHtml(tileIndex) {
    const { numIndexPressed, lastNumIndexPressed } = this.state.anim;
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
    let { numIndexPressed, tileClickMouseX, mouseX } = this.state.anim;
    //console.log(`Calling %cgetTileMotionStyle(numIndexPressed: ${numIndexPressed}), mouseX: ${mouseX}.`, Utils.getConsoleStyle('code'));
    if (numIndexPressed == tileIndex) {
      return {
        scale: spring(1.1, this.springConfig),
        shadow: spring(16, this.springConfig),
        offsetX: mouseX - tileClickMouseX,
      };
    } else {
      return {
        scale: spring(1, this.springConfig),
        shadow: spring(1, this.springConfig),
        offsetX: spring(this.state.anim.offsets[tileIndex], this.springConfig),
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

  render() {
    let numNumbers = this.state.numbers.length;
    let numbers = this.state.numbers;

    let result = this.computeResult();

    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        {/* Do this 4 times .. */}
        { range(numNumbers).map( index => {
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
