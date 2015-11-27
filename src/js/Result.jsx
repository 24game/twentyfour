import React from 'react'

var Result = React.createClass({
  propTypes: {
    value: React.PropTypes.number.isRequired
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
