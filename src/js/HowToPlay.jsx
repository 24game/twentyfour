import React from 'react';
import Instructions from './Instructions.jsx';

class HowToPlay extends React.Component {

  constructor() {
    super();
    this.state = {
      instructionsVisible: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      instructionsVisible: !this.state.instructionsVisible
    });
  }

  render() {
    return (
      <section className="unselectable default-cursor flexible columns horizontally-centered instructions">
        <span className="large uppercase" onClick={this.onClick}>How To Play</span>
        {this.state.instructionsVisible
          ? <Instructions/>
          : null}
      </section>
    );
  }

}

export default HowToPlay;
