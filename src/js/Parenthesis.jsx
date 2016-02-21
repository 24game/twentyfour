import React from 'react';

var Parenthesis = React.createClass({

  propTypes: {
    index: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired,
  },

  render: function() {
    return (
      <div className="parenthesis-tile">
        <span className="unselectable parenthesis"> {this.props.type == 'left' ? '(' : ')'} </span>
      </div>
    )
  }
});

export default Parenthesis;
