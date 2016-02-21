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

var Game = React.createClass({

  propTypes: {
    /* An array of 4 numbers */
    puzzle: React.PropTypes.array.isRequired,
    /* An array containing the allowed mathematical operators */
    operators: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    /* Default spring physics */
    this.springConfig = {stiffness: 300, damping: 50};

    /* Refs to later access each tile's position */
    this.tileRefs = [];
    return {
      /* An array of 4 numbers */
      numbers: Utils.shuffle(this.props.puzzle),
      /* An array containing the 4 standard operators as strings */
      /* We shuffle the operators and take the first three to set the initial state of the operators */
      operators: Utils.shuffle(this.props.operators).slice(0, 3),
      /* An array where the first value represents the position of the left parenthesis, the second the right, and null represents no left/right paren */
      parentheses: [0, 2],
      /* A hash containing various animation-related state data */
      anim: {
        /* The index of the tile currently being clicked (-1 if no tile is being clicked) */
        numIndexPressed: -1,
        /* The index of the last number that was pressed */
        lastNumIndexPressed: -1,
        /* The location of the cursor */
        mouseX: 0,
      }
    };
  },

  // Returns a list of possible operators.
  getPossibleOperators: function() {
    let possibleOperators = this.props.operators;
    return possibleOperators;
  },

  // Returns the index of the current operator.
  getCurrentOperatorIndex: function(currentOperator) {
    return this.getPossibleOperators().indexOf(currentOperator);
  },

  /**
  * Modifies state {operators} to cycle the operator at the specified index.
  */
  cycleOperator: function (index, operator) {
    let operatorIndex = this.getCurrentOperatorIndex(operator);
    let numOperators = this.props.operators.length;
    let nextOperatorIndex = (operatorIndex + 1) % numOperators;
    let newOperators = this.state.operators.slice(0);
    newOperators[index] = this.props.operators[nextOperatorIndex];
    this.setState({
      operators: newOperators
    });
  },

  computeResult() {
    return '42';
  },

  onTileDownHandler(tileIndex, pressX, {pageX}) {
    console.log(`Calling %conTileDownHandler(tileIndex: ${tileIndex}, pressX: ${pressX}, pageX: {${pageX}}).`, Utils.getConsoleStyle('code'));
    this.setState(update(this.state, {
      anim: {
        numIndexPressed: {$set: tileIndex}
      }
    }));
  },

  onTileUpHandler(pos, pressX, {pageX}) {
    console.log(`Calling %conTileUpHandler(pos: ${pos}, pressX: ${pressX}, pageX: {${pageX}}).`, Utils.getConsoleStyle('code'));
    this.setState(update(this.state, {
      anim: {
        numIndexPressed: {$set: null}
      }
    }));
  },

  onTileMoveHandler(pos, pressX, {pageX}) {
    console.log(`Calling %conTileMoveHandler(pos: ${pos}, pressX: ${pressX}, pageX: {${pageX}}).`, Utils.getConsoleStyle('code'));    this.setState(update(this.state, {
      anim: {
        mouseX: {$set: pageX}
      }
    }));
  },

  render: function () {
    let numNumbers = this.state.numbers.length;
    let numbers = this.state.numbers;
    let self = this;

    function getParensHtml(direction, index) {
      let parensIndex = self.state.parentheses[direction == 'left' ? 0 : 1];
      if (parensIndex == index) {
        return <Parenthesis
          index={parensIndex}
          type={direction}
          />;
      }
    }

    function getTileMotionStyle(tileIndex) {
      const { numIndexPressed, mouseX } = self.state.anim;
      if (numIndexPressed == tileIndex) {
        return {
          scale: spring(1.1, self.springConfig),
          shadow: spring(16, self.springConfig),
          x: mouseX,
        };
      } else {
        return {
          scale: spring(1, self.springConfig),
          shadow: spring(1, self.springConfig),
          x: 0,
        };
      }
    }

    function getTileHtml(index) {
      const { isNumPressed, lastNumIndexPressed } = self.state.anim;
      let tileValue = self.state.numbers[index];
      let tileStyle = getTileMotionStyle(index);
      let html =
        <Motion style={tileStyle} key={index}>
          {({scale, shadow, x}) =>
            <Tile
              onMouseDownHandler={self.onTileDownHandler.bind(null, index, x)}
              onTouchStartHandler={self.onTileDownHandler.bind(null, index, x)}
              onMouseUpHandler={self.onTileUpHandler.bind(null, index, x)}
              onTouchEndHandler={self.onTileUpHandler.bind(null, index, x)}
              onTouchCancelHandler={self.onTileUpHandler.bind(null, index, x)}
              onMouseMoveHandler={self.onTileMoveHandler.bind(null, index, x)}
              onTouchMoveHandler={self.onTileMoveHandler.bind(null, index, x)}
              value={tileValue}
              ref={(ref) => self.tileRefs[index] = ref}
              customStyles = {{
                boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                transform: `translate3d(${x}px, 0, 0) scale(${scale})`,
                WebkitTransform: `translate3d(${x}px, 0, 0) scale(${scale})`,
                zIndex: index === lastNumIndexPressed ? 99 : index,
              }}/>
          }
        </Motion>;
      return html;
    }

    function getOperatorHtml(index) {
      if (index == numNumbers - 1)
      return;

      return <Operator
        index={index}
        operator={self.state.operators[index]}
        possibleOperators={self.props.operators}
        cycleOperatorFn={self.cycleOperator}
        />;
    }

    let result = this.computeResult();

    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        {/* Do this 4 times .. */}
        { range(numNumbers).map( index => {
          return [
            // Render left parenthesis
            getParensHtml('left', index),
            // Render number tile
            getTileHtml(index),
            // Render right parenthesis
            getParensHtml('right', index),
            // Render operator
            getOperatorHtml(index),
          ];
        })}
        <EqualsSign/>
        <Result value={result}/>
      </section>
    );
  }
});

export default Game;
