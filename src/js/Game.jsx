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
  cycleFirstOperator: function(event) {
    var currentOperatorIndex = this.getCurrentOperatorIndex(event.currentTarget);
    console.log(event.currentTarget);
    var nextOperatorIndex = (currentOperatorIndex + 1) % (this.props.possibleOperators.length);
    this.setState({
      firstOperatorState: this.props.possibleOperators[nextOperatorIndex]
    });
  },

  cycleSecondOperator: function() {
    var currentOperatorIndex = this.getCurrentOperatorIndex(this.state.secondOperatorState);
    var nextOperatorIndex = (currentOperatorIndex + 1) % (this.props.possibleOperators.length);
    this.setState({
      secondOperatorState: this.props.possibleOperators[nextOperatorIndex]
    });
  },

  cycleThirdOperator: function() {
    var currentOperatorIndex = this.getCurrentOperatorIndex(this.state.thirdOperatorState);
    var nextOperatorIndex = (currentOperatorIndex + 1) % (this.props.possibleOperators.length);
    this.setState({
      thirdOperatorState: this.props.possibleOperators[nextOperatorIndex]
    });
  },

  cycleOperator: function(operator) {
    var currentOperatorIndex = this.getCurrentOperatorIndex(operator);
    console.log(operator);
    console.log(currentOperatorIndex);
    var nextOperatorIndex = (currentOperatorIndex + 1) % (this.props.possibleOperators.length);
    console.log(nextOperatorIndex);
    this.setState({
      firstOperatorState: this.props.possibleOperators[nextOperatorIndex]
    });
  },

  computeResult: function() {

  },

  // Returns the index of the current operator.
  getCurrentOperatorIndex: function(currentOperator) {
    return this.props.possibleOperators.indexOf(currentOperator);
  },

  cleanOperators(stringToClean) {
    return stringToClean.replace(/×+/g, '*').replace(/÷+/g, '/').replace(/−+/g, '-');
  },

  render: function() {
    console.log('3' + this.state.firstOperatorState + '3')
    console.log(eval('3' + this.cleanOperators(this.state.firstOperatorState) + '3'));
    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        <Tile value={3} />
        <Operator
          operator={this.state.firstOperatorState}
          possibleOperators={this.props.possibleOperators}
          cycleOperator={this.cycleFirstOperator}
          />
        <Tile value={3} />
        <Operator
          operator={this.state.secondOperatorState}
          possibleOperators={this.props.possibleOperators}
          cycleOperator={this.cycleSecondOperator}
          />
        <Tile value={3} />
        <Operator
          operator={this.state.thirdOperatorState}
          possibleOperators={this.props.possibleOperators}
          cycleOperator={this.cycleThirdOperator}
          />
        <Tile value={3} />
        <EqualsSign />
        <Result value={this.state.thirdOperatorState}/>
      </section>
    );
  }
});

export default Game;
