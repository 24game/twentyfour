var React = require('react');
var ReactDOM = require('react-dom');
var jquery = require('jquery');

var Operators = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  },

  propTypes: {
    value: React.PropTypes.isRequired,
    value: React.PropTypes.oneOf(['+', '-', '×', '÷'])
  },

  handleClick: function(event) {
    this.setState(this.cycleOperators)
  },

  cycleOperators: function() {
    return this.possibleOperators[(this.getOperatorIndex + 1) % 4]
  },

  getOperatorIndex: function() {
    return this.possibleOperators.indexOf(this.props.value)
  },

  possibleOperators: function() {
    return ['+', '-', '×', '÷']
  },
  
  render: function() {
    return (
      <div className="operator-tile">
        <span className="unselectable operator">+</span>
      </div>
    )
  }
});

ReactDOM.render(
  <Operators/>, document.getElementById('game'));

// var Operators = React.createClass({
//   getInitialState: function() {
//     return {
//       value: this.props.value
//     };
//   },
//
//   propTypes: {
//     value: React.PropTypes.isRequired,
//     value: React.PropTypes.oneOf(['+', '-', '×', '÷'])
//   },
//
//   handleClick: function(event) {
//     this.setState(this.cycleOperators)
//   },
//
//   cycleOperators: function() {
//     return this.possibleOperators[(this.getOperatorIndex + 1) % 4]
//   },
//
//   getOperatorIndex: function() {
//     return this.possibleOperators.indexOf(this.props.value)
//   },
//
//   possibleOperators: function() {
//     return ['+', '-', '×', '÷']
//   },
//
//   render: function() {
//     return (
//       <div className="Operator"> {this.getInitialState} </div>
//     )
//   }
// });
//
// ReactDOM.render(
//   <Operators />,
//   document.getElementById('game')
// );
