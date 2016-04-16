import React from 'react';
import About from './About.jsx';

class Footer extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let event = new CustomEvent('newGame', {
      bubbles: true, cancelable: true, detail: null
    });
    window.dispatchEvent(event);
  }

  render() {
    return (
      <div>
        <span onClick={this.onClick}>New Game</span>
        <span>How To Play</span>
        <span>About</span>
        <span>Share</span>
      </div>
    )
  }
};

export default Footer;
