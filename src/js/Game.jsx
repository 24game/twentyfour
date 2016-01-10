import Tile from './Tile.jsx';
import Operator from './Operator.jsx';
import EqualsSign from './EqualsSign.jsx';
import Result from './Result.jsx';
import React from 'react';

var Game = React.createClass({
  // Every game is required to have a puzzle array of four numbers.
  propTypes: {
    puzzle: React.PropTypes.array.isRequired,
    possibleOperators: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      firstOperatorState: this.props.possibleOperators[this.getRandomOperatorIndex()],
      secondOperatorState: this.props.possibleOperators[this.getRandomOperatorIndex()],
      thirdOperatorState: this.props.possibleOperators[this.getRandomOperatorIndex()]
    };
  },

  getRandomOperatorIndex: function() {
    return Math.floor(Math.random() * this.props.possibleOperators.length);
  },

  // Cycles through the operators in succession.
  cycleOperator: function() {
    var currentOperatorIndex = this.getCurrentOperatorIndex(this.state.firstOperatorState);
    var nextOperatorIndex = (currentOperatorIndex + 1) % (this.props.possibleOperators.length);
    console.log(nextOperatorIndex);
    this.setState({
      firstOperatorState: this.props.possibleOperators[nextOperatorIndex]
    });
  },

  // Returns the index of the current operator.
  getCurrentOperatorIndex: function(currentOperator) {
    return this.props.possibleOperators.indexOf(currentOperator);
  },

  render: function() {
    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        <Tile value={3} />
        <Operator
          operator={this.state.firstOperatorState}
          possibleOperators={this.props.possibleOperators}
          cycleOperator={this.cycleOperator}
          />
        <div>
          {this.state.firstOperatorState}
        </div>
      </section>
    );
  }
});

export default Game;
