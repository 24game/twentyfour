import React from 'react';

class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="result-display">
        <span className="default-cursor unselectable result">{this.props.value}</span>
      </div>
    );
  }

}

Result.propTypes = {
  value: React.PropTypes.string.isRequired
};

export default Result;
