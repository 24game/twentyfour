import Tile from './Tile.jsx';
import Operator from './Operator.jsx';
import EqualsSign from './EqualsSign.jsx';
import Result from './Result.jsx';
import React from 'react';
import Utils from './utils.js';

var Game = React.createClass({
  // Every game is required to have a puzzle array of four numbers.
  propTypes: {
    puzzle: React.PropTypes.array.isRequired,
    possibleOperators: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      operators: Array.from({length: this.props.puzzle.length - 1},
        (v, k) => Utils.getRandomValueInArray(this.props.possibleOperators)
      )
    };
  },

  // Cycles through the specified operator
  cycleOperator: function(which) {
    let operatorsStateClone = this.state.operators.slice(0);
    let currentOperator = this.state.operators[which];
    var currentOperatorIndex = this.props.possibleOperators.indexOf(currentOperator);
    var nextOperatorIndex = (currentOperatorIndex + 1) % (this.props.possibleOperators.length);
    operatorsStateClone[which] = this.props.possibleOperators[nextOperatorIndex];
    this.setState({
      operators: operatorsStateClone
    });
  },

  computeResult: function() {

  },

  cleanOperators(stringToClean) {
    return stringToClean.replace(/×+/g, '*').replace(/÷+/g, '/').replace(/−+/g, '-');
  },

  render: function() {
    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        {this.props.puzzle.map((value, i) => {
          let tile = <Tile value={value} />;
          if (i < this.props.puzzle.length - 1) {
            var operator = <Operator
              index={i}
              operator={this.state.operators[i].toString()}
              possibleOperators={this.props.possibleOperators}
              cycleOperator={this.cycleOperator}
              />;
          }
          return [
            tile,
            operator
          ];
        })}
        <EqualsSign />
        <Result value={this.state.operators[0]}/>
      </section>
    );
  }
});

export default Game;
