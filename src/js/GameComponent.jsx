import React from 'react';
import Game from './Game.jsx';
import Utils from './utils.js';

var GameComponent = React.createClass({

  propTypes: {
    puzzles: React.PropTypes.array.isRequired,
    operators: React.PropTypes.array.isRequired
  },

  getRandomPuzzle: function() {
    let numberTiles = null;
    do {
      let random = Math.floor(Math.random() * this.puzzleSize - 1);
      numberTiles = this.props.puzzles[random].numberTiles;
    } while (Utils.uniqueArray(numberTiles).length !== 4);
    return numberTiles;
  },

  getInitialState: function() {
    this.puzzleSize = this.props.puzzles.length;
    return {
      puzzle: this.getRandomPuzzle()
    };
  },

  getNewGame: function() {
    this.setState({
      puzzle: this.getRandomPuzzle()
    });
  },

  resetGame: function() {
    this.setState({
      puzzle: this.props.puzzles
    });
  },

  render: function() {
    return (
      <div>
        <Game puzzle={this.state.puzzle} operators={this.props.operators}/>
        <div>
          <span onClick={this.getNewGame}>New Game</span>
          <span onClick={this.resetGame}>Reset</span>
          <span onClick={this.resetGame}>How To Play</span>
         </div>
      </div>
    )
  }

});

export default GameComponent;
