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

  // <Tile value={this.props.puzzle[1]} />
  // <Operator possibleOperators={possibleOperators}/>
  // <Tile value={this.props.puzzle[2]} />
  // <Operator possibleOperators={possibleOperators}/>
  // <Tile value={this.props.puzzle[3]} />
  // <EqualsSign />
  // <Result value={24} />
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

  render: function() {
    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        <Tile value={3} />
        <Operator
          initialOperator={this.state.firstOperatorState}
          possibleOperators={this.props.possibleOperators}
          />
        <Operator
          initialOperator={this.state.secondOperatorState}
          possibleOperators={this.props.possibleOperators}
          />
        <Operator
          initialOperator={this.state.thirdOperatorState}
          possibleOperators={this.props.possibleOperators}
          />
      </section>
    );
  }
});

export default Game;
