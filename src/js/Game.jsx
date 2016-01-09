import Tile from './Tile.jsx';
import Operator from './Operator.jsx';
import EqualsSign from './EqualsSign.jsx';
import Result from './Result.jsx';
import React from 'react';

var Game = React.createClass({
  // Every game is required to have a puzzle array of four numbers.
  propTypes: {
    puzzle: React.PropTypes.array.isRequired,
  },

  render: function() {
    var possibleOperators = ['+', '−', '×', '÷'];
    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        <Tile value={this.props.puzzle[0]} />
        <Operator possibleOperators={possibleOperators}/>
        <Tile value={this.props.puzzle[1]} />
        <Operator possibleOperators={possibleOperators}/>
        <Tile value={this.props.puzzle[2]} />
        <Operator possibleOperators={possibleOperators}/>
        <Tile value={this.props.puzzle[3]} />
        <EqualsSign />
        <Result value={24} />
      </section>
    );
  }
});

export default Game;
