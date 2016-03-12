import React from 'react';

var Operator = React.createClass({

  propTypes: {
    index: React.PropTypes.number.isRequired,
    operator: React.PropTypes.string.isRequired,
    cycleOperatorFn: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <div className="operator-tile"
           onClick={this.props.cycleOperatorFn.bind(null, this.props.index, this.props.operator)}
           zIndex="1">
        <span className="unselectable operator"> {this.props.operator} </span>
      </div>
    )
  }
});

export default Operator;
