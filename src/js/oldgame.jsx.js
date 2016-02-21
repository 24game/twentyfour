import Tile from './Parenthesis.jsx';
import Operator from './Operator.jsx';
import EqualsSign from './EqualsSign.jsx';
import Result from './Result.jsx';
import React from 'react';
import Utils from './utils.js';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import ReactDOM from 'react-dom';

var Game = React.createClass({

  propTypes: {
    /* An array of 4 numbers */
    puzzle: React.PropTypes.array.isRequired,
    /* An array containing the allowed mathematical operators */
    operators: React.PropTypes.array.isRequired
  },

  getInitialState: function () {
    /* Refs to later access each tile's position */
    this.tileRefs = [];
    return {
      /* An array of 4 numbers */
      numbers: Utils.shuffle(this.props.puzzle),
      /* An array containing the 4 standard operators as strings */
      operators: Utils.shuffle(this.props.operators),
      /* An array where the first value represents the position of the left parenthesis, the second the right, and null represents no left/right paren */
      parentheses: [null, null],
      /* A hash containing various animation-related state data */
      anim: {
        /* Is a number tile currently being clicked on? */
        numIndexPressed: false,
        /* The index of the last number that was pressed */
        lastNumIndexPressed: 0
      }
    };
  },

  /**
   * Modifies state {operators} to cycle the operator at the specified index.
   */
  cycleOperator: function (operatorIndex) {
    let numOperators = this.state.operators.length;
    let nextOperatorIndex = (operatorIndex + 1) % numOperators;
    let newOperators = this.state.operators.slice(0);
    newOperators[operatorIndex] = this.props.operators[nextOperatorIndex];
    this.setState({
      operators: newOperators
    });
  },

  handleMouseMove({pageX, pageY}) {
    //console.log(`Calling %chandleMouseMove(pageX: ${pageX}, pageY: ${pageY}).`, Utils.getConsoleStyle('code'));
    const {isPressed, delta, order, lastPressed} = this.state;
    if (isPressed) {
      const mouse = pageX - delta;
      const row = Utils.clamp(Math.round(mouse / 175), 0, this.props.puzzle.length - 1);
      const newOrder = Utils.swap(order, order.indexOf(lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
      console.log(`Calling %chandleMouseMove.setState(mouse: ${mouse}, order: ${newOrder}).`, Utils.getConsoleStyle('code'));
    }
  },

  handleMouseUp() {
    this.setState({isPressed: false, delta: 0});
  },

  handleMouseDown(pos, pressX, {pageX}) {
    console.log(`Calling %chandleMouseDown(pos: ${pos}, pressX: ${pressX}, pageX: {${pageX}}).`, Utils.getConsoleStyle('code'));
    this.setState({
      delta: pageX - pressX,
      mouse: pressX,
      isPressed: true,
      lastPressed: pos,
    });
    console.log(`Calling %csetState(delta: ${pageX - pressX}, mouse: ${pressX}, isPressed: true, lastPressed: ${pos})`, Utils.getConsoleStyle('code'));
  },


  render: function () {
    const {mouse, isPressed, lastPressed, delta, order} = this.state;
    const springConfig = {stiffness: 300, damping: 50};
    let springValues = [];
    this.props.puzzle.map((value, i) => {
      if (lastPressed === i && isPressed)
      {
        springValues.push(delta);
      }
    });
    console.info('Deltas:', springValues);
    var self = this;
    function getTilePositions(i) {
      return {
        leftOrigin: ReactDOM.findDOMNode(self.tileRefs[i]).offsetLeft,
        rightOrigin: ReactDOM.findDOMNode(self.tileRefs[i]).offsetLeft + ReactDOM.findDOMNode(self.tileRefs[i]).offsetWidth
      };
    }

    /**
     * Given the index of the pressed tile, returns the distance to the closest tile's closest edge.
     */
    function getSmallestNeighboringDistanceAndTile(pressedTileIndex) {
      let pressedPosition = getTilePositions(pressedTileIndex);
      let leftPosition = {leftOrigin: -window.width, rightOrigin: -window.width };
      let leftTileIndex = pressedTileIndex;
      if (pressedTileIndex > 0) {
        leftTileIndex--;
        leftPosition = getTilePositions(pressedTileIndex - 1);
      }
      let rightPosition = {leftOrigin: window.width, rightOrigin: window.width};
      let rightTileIndex = pressedTileIndex;
      if (pressedTileIndex < self.props.puzzle.length - 1) {
        rightTileIndex++;
        rightPosition = getTilePositions(pressedTileIndex + 1);
      }
      let a = leftPosition.leftOrigin - pressedPosition.leftOrigin;
      let b = leftPosition.leftOrigin - pressedPosition.rightOrigin;
      let c = leftPosition.rightOrigin - pressedPosition.leftOrigin;
      let d = leftPosition.rightOrigin - pressedPosition.rightOrigin;
      let leftMinDistance = Math.abs(Math.min(a, b, c, d));
      let a1 = rightPosition.leftOrigin - pressedPosition.leftOrigin;
      let b1 = rightPosition.leftOrigin - pressedPosition.rightOrigin;
      let c1 = rightPosition.rightOrigin - pressedPosition.leftOrigin;
      let d1 = rightPosition.rightOrigin - pressedPosition.rightOrigin;
      let rightMinDistance = Math.abs(Math.min(a1, b1, c1, d1));

      if (leftMinDistance < rightMinDistance) {
        return {distance: leftMinDistance, tile: leftTileIndex};
      } else {
        return {distance: rightMinDistance, tile: rightTileIndex};
      }
    }

    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        {this.props.puzzle.map((value, i) => {
          const style = lastPressed === i && isPressed
            ? {
            scale: spring(1.1, springConfig),
            shadow: spring(16, springConfig),
            x: mouse,
          }
            : {
            scale: spring(1, springConfig),
            shadow: spring(1, springConfig),
            x: 0,
          };
          if (isPressed) {
            let smallestDistanceTile = getSmallestNeighboringDistanceAndTile(lastPressed);
            console.log(smallestDistanceTile);
          }
          let motionTile =
            <Motion style={style} key={i}>
              {({scale, shadow, x}) =>
                <Tile
                  onMouseDownHandler={this.handleMouseDown.bind(null, i, x)}
                  value={value}
                  ref={(ref) => this.tileRefs[i] = ref}
                  customStyles = {{
                boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                transform: `translate3d(${x}px, 0, 0) scale(${scale})`,
                WebkitTransform: `translate3d(${x}px, 0, 0) scale(${scale})`,
                zIndex: i === lastPressed ? 99 : i,
              }}/>
              }
            </Motion>;
          if (i < this.props.puzzle.length - 1) {
            var operator = <Operator
              index={i}
              operator={this.state.operators[i]}
              possibleOperators={this.props.operators}
              cycleOperator={this.cycleOperator}/>;
          }
          return [
            motionTile,
            operator
          ];
        })} <EqualsSign /> <Result value={this.state.operators[0]}/>
      </section>
    );
  }
});

import $ from 'jquery';
window.jQuery = $;
export default Game;/**
 * Created by jpang on 2/21/16.
 */
