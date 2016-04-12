import React from 'react';
import Game from './Game.jsx';
import Utils from './utils.js';
import Instructions from './Instructions.jsx';
import About from './About.jsx';

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
    }
  },

  getNewGame: function() {
    this.setState({
      puzzle: this.getRandomPuzzle()
    });
  },

  render: function() {
    return (
      <div>
        <Game puzzle={this.state.puzzle} operators={this.props.operators}/>
        <div className="centered sub-items">
          <span style={{padding: `10px`}} onClick={this.getNewGame}>New Game</span>
          <span style={{padding: `10px`}} onClick={this.getNewGame}>How To Play</span>
          <span style={{padding: `10px`}} onClick={this.getNewGame}>About</span>
          <span style={{padding: `10px`}} >Share</span>
        </div>
      </div>
    );
  }
});
//
//   render: function() {
//     return (
//       <div>
//         <Game puzzle={this.state.puzzle} operators={this.props.operators}/>
//         <div className="centered sub-items">
//           <span style={{padding: `10px`}} onClick={this.getNewGame}>New Game</span>
//           <span style={{padding: `10px`}} onClick={this.getNewGame}>How To Play</span>
//           <span style={{padding: `10px`}} onClick={this.getNewGame}>About</span>
//           <span style={{padding: `10px`}} >Share</span>
//         </div>
//       );
//     }
//   }
// });


// class GameComponent extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       puzzle: this.getRandomPuzzle(),
//       instructionsVisible: false,
//       aboutVisible: false,
//       shareVisible: false
//     };
//     this.getNewGame = this.getNewGame.bind(this);
//     // this.showInstructions = this.showInstructions.bind(this);
//     // this.showAbout = this.showAbout.bind(this);
//     // this.showShare = this.showShare.bind(this);
//   }
//
//   getRandomPuzzle() {
//     let random = Math.floor(Math.random() * this.props.puzzles.length - 1);
//     return this.props.puzzles[random].numberTiles;
//   }
//
//   getNewGame() {
//     console.log("Getting new puzzle");
//     this.setState({
//       puzzle: this.getRandomPuzzle()
//     });
//   }
//
//   showInstructions() {
//     this.setState({
//       instructionsVisible: !this.state.instructionsVisible,
//       aboutVisible: false,
//       shareVisible: false,
//     });
//   }
//
//   showAbout() {
//     this.setState({
//       instructionsVisible: false,
//       aboutVisible: !this.state.aboutVisible,
//       shareVisible: false,
//     });
//   }
//
//   showShare() {
//     this.setState({
//       instructionsVisible: false,
//       aboutVisible: false,
//       shareVisible: !this.state.shareVisible,
//     });
//   }
//
//   render() {
//     return (
//       <div>
//         <Game puzzle={this.state.puzzle} operators={this.props.operators}/>
//         <div className="centered sub-items">
//           <span style={{padding: `10px`}} onClick={this.getNewGame}>New Game</span>
//           {/*<span style={{padding: `10px`}} onClick={this.showInstructions}>How To Play</span>
//           <span style={{padding: `10px`}} onClick={this.showAbout}>About</span>
//           <span style={{padding: `10px`}} onClick={this.showShare}>Share</span>
//           {this.state.instructionsVisible
//             ? <Instructions/>
//             : null}
//           {this.state.aboutVisible
//             ? <About/>
//             : null}*/}
//         </div>
//       </div>
//     );
//   }
//
// }
//
// GameComponent.propTypes = {
//   puzzles: React.PropTypes.array.isRequired,
//   operators: React.PropTypes.array.isRequired
// };

export default GameComponent;
