import React from 'react';

import Instructions from './Instructions.jsx';

// Toggle the instructions on click.
var HowToPlay = React.createClass({
  // Initially hide the instructions.
  getInitialState: function() {
    return {instructionsVisible: false};
  },

  // Set toggle state based on clicks.
  onClick: function() {
    this.setState({
      instructionsVisible: !this.state.instructionsVisible
    });
  },

  render: function() {
    return (
      <section className="unselectable default-cursor flexible columns horizontally-centered instructions">
        <span className="large uppercase" onClick={this.onClick}>How To Play</span>
        {this.state.instructionsVisible
          ? <Instructions/>
          : null}
      </section>
    )
  }
});

export default HowToPlay;
