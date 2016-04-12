import React from 'react';

class Parenthesis extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="parenthesis-tile">
        <span className="unselectable parenthesis"> {this.props.type == 'left' ? '(' : ')'} </span>
      </div>
    );
  }

}

Parenthesis.propTypes = {
  index: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired
};

export default Parenthesis;
