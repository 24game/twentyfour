import React from 'react';

var Result = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired
  },

  // Results are rounded to one decimal place.
  formatResult: function(value) {
    return value.toFixed(1);
  },

  computeResult: function() {
    var value = this.formatResult(eval());
    return value; 
  },

  render: function() {
    return (
      <div className="result-display">
        <span className="default-cursor unselectable result">{this.props.value}</span>
      </div>
    );
  }
});

export default Result;
