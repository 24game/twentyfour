import React from 'react';

class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let className = "default-cursor unselectable result";
    let value = this.props.value === "null" ? ":(" : this.props.value;
    if (value === "24") {
      className += " large success";
    }

    return (
      <div className="result-display">
        <span className={className}>{value}</span>
      </div>
    );
  }

}

Result.propTypes = {
  value: React.PropTypes.string.isRequired
};

export default Result;
