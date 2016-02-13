import React from 'react';

var Parenthesis = React.createClass({

  propTypes: {

    index: React.PropTypes.number.isRequired,
  },

  render: function() {
    return (
      <div className="operator-tile" onClick={this.props.cycleOperator.bind(null, this.props.index)}>
        <span className="unselectable operator"> {this.props.operator} </span>
      </div>
    )
  }
});

export default Parenthesis;
