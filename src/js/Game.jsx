import Tile from './Tile.jsx';
import Operator from './Operator.jsx';
import EqualsSign from './EqualsSign.jsx';
import Result from './Result.jsx';
import React from 'react';
import Utils from './utils.js';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

const itemsCount = 4;
const springConfig = {stiffness: 300, damping: 50};

var willChange = true;

var Game = React.createClass({
  // Every game is required to have a puzzle array of four numbers.
  propTypes: {
    puzzle: React.PropTypes.array.isRequired,
    possibleOperators: React.PropTypes.array.isRequired
  },

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);


    setInterval(() => {
      if (window.lastStyle === undefined) {
        window.lastStyle = {};
      }
      if (JSON.stringify(window.style) !== JSON.stringify(window.lastStyle)) {
        console.warn(`Style changed from ${JSON.stringify(window.lastStyle, null, 4)} to ${JSON.stringify(window.style, null, 4)}`);
        window.lastStyle = window.style;
      }
    }, 15);
  },

  getInitialState: function () {
    return {
      operators: Array.from(
        {length: this.props.puzzle.length - 1},
        () => Utils.getRandomValueInArray(this.props.possibleOperators)
      ),
      value: 0,
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
      order: range(itemsCount),
    };
  },

  // Cycles through the specified operator
  cycleOperator: function (which) {
    let operatorsStateClone = this.state.operators.slice(0);
    let currentOperator = this.state.operators[which];
    var currentOperatorIndex = this.props.possibleOperators.indexOf(currentOperator);
    var nextOperatorIndex = (currentOperatorIndex + 1) % (this.props.possibleOperators.length);
    operatorsStateClone[which] = this.props.possibleOperators[nextOperatorIndex];
    this.setState({
      operators: operatorsStateClone
    });
  },

  computeResult: function () {
  },

  cleanOperators(stringToClean) {
    return stringToClean.replace(/×+/g, '*').replace(/÷+/g, '/').replace(/−+/g, '-');
  },

  handleMouseMove({pageX, pageY}) {
    //console.log(`Calling %chandleMouseMove(pageX: ${pageX}, pageY: ${pageY}).`, Utils.getConsoleStyle('code'));
    const {isPressed, delta, order, lastPressed} = this.state;
    if (isPressed) {
      const mouse = pageX - delta;
      const row = Utils.clamp(Math.round(mouse / 100), 0, itemsCount - 1);
      const newOrder = Utils.reinsert(order, order.indexOf(lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
      //console.log(`Calling %chandleMouseMove.setState(mouse: ${mouse}, order: ${newOrder}).`, Utils.getConsoleStyle('code'));
    }
  },

  handleMouseDown(pos, pressX, {pageX}) {
    //console.log(`Calling %chandleMouseDown(pos: ${pos}, pressX: ${pressX}, pageX: {${pageX}}).`, Utils.getConsoleStyle('code'));
    this.setState({
      delta: pageX - pressX,
      mouse: pressX,
      isPressed: true,
      lastPressed: pos,
    });

    //console.log(`Calling %csetState(delta: ${pageX - pressX}, mouse: ${pressX}, isPressed: true, lastPressed: ${pos})`, Utils.getConsoleStyle('code'));
  },

  handleMouseUp() {
    this.setState({isPressed: false, delta: 0});
    //console.log(`Calling %csetState(isPressed: false, delta: 0).`, Utils.getConsoleStyle('code'));
  },

  render() {
    const {mouse, isPressed, lastPressed, order} = this.state;

    return (
      <div className="demo8">
        {range(itemsCount).map(i => {
          const style = lastPressed === i && isPressed
            ? {
            scale: spring(20),
            shadow: spring(30),
            x: spring(order.indexOf(i) * 100, springConfig),
          }
            : {
            scale: spring(2),
            shadow: spring(3),
            x: spring(order.indexOf(i) * 100, springConfig),
          };
          willChange = !willChange;
          window.spring = spring(1.1, springConfig);
          console.warn(window.spring);
          window.style = style;
          return (
            <Motion style={style} key={i}>
              {({scale, shadow, x}) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, i, x)}>
                  {shadow}
                </div>
              }
            </Motion>
          );
        })}
      </div>
    );
  },


  //render: function () {
  //  const {mouse, isPressed, lastPressed, order} = this.state;
  //
  //  var computedResult = eval('1' + Utils.cleanOperators(this.state.operators[0]) + '1' + Utils.cleanOperators(this.state.operators[1]) + '1' + Utils.cleanOperators(this.state.operators[2]) + '8').toString();
  //  console.log(computedResult);
  //  return (
  //    <section className="flexible rows horizontally-centered vertically-centered game">
  //      {this.props.puzzle.map((value, i) => {
  //        console.log(lastPressed, i, isPressed);
  //        const style = lastPressed === i && isPressed
  //          ? {
  //          scale: spring(1.1, springConfig),
  //          shadow: spring(16, springConfig),
  //          x: mouse,
  //        }
  //          : {
  //          scale: spring(1, springConfig),
  //          shadow: spring(1, springConfig),
  //          x: mouse
  //        };
  //        return (
  //          <Motion style={style} key={i}>
  //            {({scale, shadow, x}) =>
  //              <div
  //                onMouseDown={this.handleMouseDown.bind(null, i, x)}
  //                className="number-tile"
  //                style={{
  //                  boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
  //                  transform: `translate3d(0, ${x}px, 0)`,
  //                  zIndex: i === lastPressed ? 99 : i,
  //                }}>
  //                {shadow}
  //              </div>
  //            }
  //          </Motion>
  //        );
  //      })}
  //      <EqualsSign />
  //      <Result value={Utils.cleanComputedResult(computedResult)}/>
  //    </section>
  //  );
  //}
});

export default Game;
