import React from 'react';
import Utils from './utils.js';

class Operator extends React.Component {

  constructor(props) {
    super(props);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {};
  }

  onTouchStart(e) {
    this.beginHoverEffect();
  }

  onMouseEnter(e) {
    console.log('Called onMouseEnter.');
    this.beginHoverEffect();
  }

  onMouseLeave(e) {
    this.endHoverEffect();
  }

  onTouchMove(e) {
    this.endHoverEffect();
  }

  onMouseDown(e) {
    this.beginHoverEffect();
  }

  onMouseUp(e) {
    this.endHoverEffect();
  }

  onClick(e) {
    this.endHoverEffect();
    this.performClick();
  }

  performClick() {
    console.log(`Called %cperformClick on tile index ${this.props.index} with current operator ${this.props.operator}.`, Utils.getConsoleStyle('code'));
    this.props.cycleOperatorFn(this.props.index, this.props.operator);
  }

  beginHoverEffect() {
    console.log('Called %cbeginHoverEffect.', Utils.getConsoleStyle('code'));
    this.setState({hovering: true});
  }

  endHoverEffect() {
    console.log('Called %cendHoverEffect.', Utils.getConsoleStyle('code'));
    this.setState({hovering: false});
  }

  render() {
    let isHovering = this.state.hovering;
    return (
      <div
        className={`operator-tile ${isHovering ? 'operator-hover' : ''}`}
        onTouchStart={this.onTouchStart}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onTouchMove={this.onTouchMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onClick={this.onClick}
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
