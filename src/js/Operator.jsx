import React from 'react';

var Operator = React.createClass({

  propTypes: {
    operator: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    cycleOperatorFn: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <div className="operator-tile" onClick={this.props.cycleOperatorFn.bind(null, this.props.index)}>
        <span className="unselectable operator"> {this.props.operator} </span>
      </div>
    )
  }
});

export default Operator;
