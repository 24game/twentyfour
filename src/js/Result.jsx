import React from 'react';

class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let className = "default-cursor unselectable result";
    if (this.props.value === "24") {
      className += " success";
    }

    return (
      <div className="result-display">
        <span className={className}>{this.props.value}</span>
      </div>
    );
  }

}

Result.propTypes = {
  value: React.PropTypes.string.isRequired
};

export default Result;
