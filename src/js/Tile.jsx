import React from 'react';

var Tile = React.createClass({

  // All tiles are required to have some value.
  propTypes: {
    value: React.PropTypes.number.isRequired
  },

  render: function() {
    return (
        <div
          className="number-tile"
          onMouseDown = {this.props.onMouseDownHandler}
          onTouchStart = {this.props.onTouchStartHandler}
          onMouseUp = {this.props.onMouseUpHandler}
          onTouchEnd = {this.props.onTouchEndHandler}
          onTouchCancel = {this.props.onTouchCancelHandler}
          onMouseMove = {this.props.onMouseMoveHandler}
          onTouchMove = {this.props.onTouchMoveHandler}
          style = {this.props.customStyles}
          onDoubleClick={this.props.onDoubleClick}>
          <span className="unselectable number">{this.props.value}</span>
        </div>
    )
  }
});

export default Tile;
