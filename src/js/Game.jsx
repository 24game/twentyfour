import $ from 'jquery';
import Tile from './Parenthesis.js';
import Operator from './Operator.jsx';
import EqualsSign from './EqualsSign.jsx';
import Result from './Result.jsx';
import React from 'react';
import Utils from './utils.js';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import ReactDOM from 'react-dom';

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
      operators: Utils.shuffle(this.props.operators),
      /* An array where the first value represents the position of the left parenthesis, the second the right, and null represents no left/right paren */
      parentheses: [null, null],
      /* A hash containing various animation-related state data */
      anim: {
        /* Is a number tile currently being clicked on? */
        isNumPressed: false,
        /* The index of the last number that was pressed */
        lastNumIndexPressed: 0
      }
    };
  },

  /**
   * Modifies state {operators} to cycle the operator at the specified index.
   */
  cycleOperator: function (operatorIndex) {
    console.log()
    let numOperators = this.state.operators.length;
    let nextOperatorIndex = (operatorIndex + 1) % numOperators;
    let newOperators = this.state.operators.slice(0);
    newOperators[operatorIndex] = this.props.operators[nextOperatorIndex];
    this.setState({
      operators: newOperators
    });
  },

  handleMouseMove({pageX, pageY}) {
    //console.log(`Calling %chandleMouseMove(pageX: ${pageX}, pageY: ${pageY}).`, Utils.getConsoleStyle('code'));
    const {isPressed, delta, order, lastPressed} = this.state;
    if (isPressed) {
      const mouse = pageX - delta;
      const row = Utils.clamp(Math.round(mouse / 175), 0, this.props.puzzle.length - 1);
      const newOrder = Utils.swap(order, order.indexOf(lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
      console.log(`Calling %chandleMouseMove.setState(mouse: ${mouse}, order: ${newOrder}).`, Utils.getConsoleStyle('code'));
    }
  },

  handleMouseUp() {
    this.setState({isPressed: false, delta: 0});
  },

  handleMouseDown(pos, pressX, {pageX}) {
    console.log(`Calling %chandleMouseDown(pos: ${pos}, pressX: ${pressX}, pageX: {${pageX}}).`, Utils.getConsoleStyle('code'));
    this.setState({
      delta: pageX - pressX,
      mouse: pressX,
      isPressed: true,
      lastPressed: pos,
    });
    console.log(`Calling %csetState(delta: ${pageX - pressX}, mouse: ${pressX}, isPressed: true, lastPressed: ${pos})`, Utils.getConsoleStyle('code'));
  },

  computeResult() {
    return '42';
  },

  render: function () {
    let numNumbers = this.state.numbers.length;
    let numbers = this.state.numbers;
    let self = this;

    function getLeftParensHtml(index) {

    }

    function getTileHtml(index) {

    }

    function getRightParensHtml(index) {

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
            getLeftParensHtml(index),
            // Render number tile
            getTileHtml(index),
            // Render right parenthesis
            getRightParensHtml(index),
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
