import React from 'react';

var Operator = React.createClass({

  propTypes: {
    initialOperator: React.PropTypes.string.isRequired,
    possibleOperators: React.PropTypes.array.isRequired
  },

  // The initial operator state should be set in the parent component.
  getInitialState: function() {
    return {
      operator: this.props.initialOperator
    };
  },

  // Cycles through the operators in succession.
  cycleOperator: function() {
    var currentOperatorIndex = this.getCurrentOperatorIndex(this.state.operator);
    var nextOperatorIndex = (currentOperatorIndex + 1) % (this.props.possibleOperators.length);
    this.setState({
      operator: this.props.possibleOperators[nextOperatorIndex]
    });
  },

  // Returns the index of the current operator.
  getCurrentOperatorIndex: function(currentOperator) {
    return this.props.possibleOperators.indexOf(currentOperator);
  },

  render: function() {
    return (
      <div className="operator-tile" onClick={this.cycleOperator}>
        <span className="unselectable operator"> {this.state.operator} </span>
      </div>
    )
  }
});

export default Operator;
