import React from 'react';

var Tile = React.createClass({
  getInitialState: function() {
    return {
      value: '1',
      swappable: false,
      parenthesizable: false
    };
  },

  toggleSwappable: function() {
    this.setState({
      swappable: !this.state.swappable
    });
    console.log('Swappable: ' + this.state.swappable);
  },

  toggleParenthesizable: function() {
    this.setState({
      parenthesizable: !this.state.parenthesizable
    });
    console.log('Parenthesizable: ' + this.state.parenthesizable);
  },

  render: function() {
    return (
      <div className="number-tile" onClick={this.toggleSwappable} onDoubleClick={this.toggleParenthesizable}>
        <span className="unselectable number">{this.state.value}</span>
      </div>
    )
  }
});

export default Tile;
