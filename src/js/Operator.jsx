import React from 'react';

class Operator extends React.Component {

  constructor(props) {
    super(props);
    // this.cycleOperatorFn = this.cycleOperatorFn.bind(this);
  }

  render() {
    return (
      <div
        className="operator-tile"
        onClick={this.props.cycleOperatorFn.bind(null, this.props.index, this.props.operator)}
        zIndex="1">
        <span className="unselectable operator"> {this.props.operator} </span>
      </div>
    );
  }

}

Operator.propTypes = {
  index: React.PropTypes.number.isRequired,
  operator: React.PropTypes.string.isRequired,
  cycleOperatorFn: React.PropTypes.func.isRequired,
};

export default Operator;
