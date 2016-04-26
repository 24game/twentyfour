import React from 'react';
import About from './About.jsx';
import Instructions from './Instructions.jsx';
import Share from './Share.jsx';

class Footer extends React.Component {

  constructor() {
    super();
    this.getNewGame = this.getNewGame.bind(this);
    this.displayInstructions = this.displayInstructions.bind(this);
    this.displayAbout = this.displayAbout.bind(this);
    this.displayShare = this.displayShare.bind(this);
    this.state = {
      showInstructions: true,
      showAbout: false,
      showShare: false
    };
  }

  getNewGame() {
    let event = new CustomEvent('newGame', {
      bubbles: true, cancelable: true, detail: null
    });
    window.dispatchEvent(event);
  }

  displayInstructions() {
    this.setState({
      showAbout: false,
      showShare: false,
      showInstructions: !this.state.showInstructions
    });
  }

  displayAbout() {
    this.setState({
      showInstructions: false,
      showShare: false,
      showAbout: !this.state.showAbout
    });
  }

  displayShare() {
    this.setState({
      showInstructions: false,
      showAbout: false,
      showShare: !this.state.showShare
    });
  }

  render() {
     let display = (this.state.showInstructions ? <Instructions /> :
       (this.state.showAbout ? <About /> : (this.state.showShare ? <Share /> : null)));
    return (
      <section className="unselectable default-cursor centered footer">
        <span className="newGame footer-item" onClick={this.getNewGame}>New Game</span>
        <span className="divider"> ⋮ </span>
        <span className="instructions footer-item" onClick={this.displayInstructions}>How To Play</span>
        <span className="divider"> ⋮ </span>
        <span className="about footer-item" onClick={this.displayAbout}>About</span>
        <span className="divider"> ⋮ </span>
        <span className="share footer-item" onClick={this.displayShare}>Share</span>
        {display}
      </section>
    );
  }

};

export default Footer;
