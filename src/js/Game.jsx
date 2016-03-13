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
      numbers: Utils.shuffle(nextProps.puzzle),
      operators: Utils.shuffle(nextProps.operators),
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

  clearParentheses() {
    let _parentheses = [null, null];
    this.setState(update(this.state, {
      parentheses: {$set: _parentheses}
    }));
  }

  setLeftParenthesis(tilePosition) {
    let _parentheses = this.state.parentheses.slice(0);
    _parentheses[0] = tilePosition;
    this.setState(update(this.state, {
      parentheses: {$set: _parentheses}
    }));
  }

  setRightParenthesis(tilePosition) {
    let _parentheses = this.state.parentheses.slice(0);
    _parentheses[1] = tilePosition;
    this.setState(update(this.state, {
      parentheses: {$set: _parentheses}
    }));
  }

  onPointerMove({pageX}) {
    console.log(`Calling %conPointerMove(pageX: ${pageX}}).`, Utils.getConsoleStyle('code'));
    this.setState(update(this.state, {
      anim: {
        /* The current mouse position, relative to the page (layout viewport) */
        mouseX: {$set: pageX}
      }
    }));
  }

  onPointerUp(e) {
    console.log(`Calling %conPointerUp(event: ${e}}).`, Utils.getConsoleStyle('code'));
    let lastNumIndexPressed = this.state.anim.numIndexPressed;
    this.setState(update(this.state, {
      anim: {
        // No tile is being pressed anymore
        numIndexPressed: {$set: -1},
        lastNumIndexPressed: {$set: lastNumIndexPressed},
        // Reset the offset to 0 so the tile animates back to its starting position
        tileClickMouseX: {$set: 0},
        mouseX: {$set: 0}
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
        mouseX: {$set: pageX}
      }
    }));
  }

  getTileZIndex(renderingTileIndex) {
    // If the current tile being rendered is held down and moved, or mouse was released and last held tile is moving back to original position
    let { numIndexPressed, lastNumIndexPressed } = this.state.anim;
    if (renderingTileIndex == numIndexPressed || renderingTileIndex ==lastNumIndexPressed) {
      return 99999;
    } else {
      return 100;
    }
  }

  getTileHtml(tileIndex) {
    const { numIndexPressed, lastNumIndexPressed } = this.state.anim;
    let tileValue = this.state.numbers[tileIndex];
    let tileStyle = this.getTileMotionStyle(tileIndex);
    let html =
      <Motion style={tileStyle} key={tileIndex}>
        {({scale, shadow, offsetX}) =>
          <Tile onMouseDownHandler={this.onTileDownHandler.bind(this, tileIndex)}
                onTouchStartHandler={this.onTileDownHandler.bind(this, tileIndex)}
                value={tileValue} ref={(ref) => this.tileRefs[tileIndex] = ref}
                customStyles={{
                  boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                  transform: `translate3d(${offsetX}px, 0, 0) scale(${scale})`,
                  zIndex: this.getTileZIndex(tileIndex),
                }}/>
        }
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
        offsetX: spring(0, this.springConfig),
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
