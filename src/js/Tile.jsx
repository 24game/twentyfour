import React from 'react';

var Tile = React.createClass({

  // All tiles are required to have some value.
  propTypes: {
    value: React.PropTypes.number.isRequired
  },

  // Initially tiles are not swappable or parenthesizable.
  getInitialState: function() {
    return {
      swappable: false,
      parenthesizable: false
    };
  },

  // Method used to toggle swappable state.
  toggleSwappable: function() {
    this.setState({
      swappable: !this.state.swappable
    });
    console.log(this.state.swappable);
  },

  // Method used to toggle parenthesizable state.
  toggleParenthesizable: function() {
    this.setState({
      parenthesizable: !this.state.parenthesizable
    });
    console.log('parenthesis: ' + this.state.parenthesizable);
  },

  render: function() {
    return (
      <div className="number-tile" onClick={this.toggleSwappable} onDoubleClick={this.toggleParenthesizable}>
        <span className="unselectable number">{this.props.value}</span>
      </div>
    )
  }
});

export default Tile;
