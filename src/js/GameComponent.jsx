import React from 'react';
import Game from './Game.jsx';

var GameComponent = React.createClass({

  propTypes: {
    puzzles: React.PropTypes.array.isRequired,
    operators: React.PropTypes.array.isRequired
  },

  getRandomPuzzle: function() {
    let random = Math.floor(Math.random() * this.puzzleSize - 1);
    return this.props.puzzles[random].numberTiles;
  },

  getInitialState: function() {
    this.puzzleSize = this.props.puzzles.length;
    return {
      puzzle: this.getRandomPuzzle()
    };
  },

  handleClick: function() {
    this.setState({
      puzzle: this.getRandomPuzzle()
    });
  },

  render: function() {
    return (
      <div>
        <div onClick={this.handleClick}>New Game</div>
        <Game puzzle={this.state.puzzle} operators={this.props.operators}/>
      </div>
    )
  }

});

export default GameComponent;
