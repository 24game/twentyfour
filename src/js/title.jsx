var React = require('react');
var ReactDOM = require('react-dom');

var Title = React.createClass({
  render: function() {
    return (
      <div className="centered">
        <h1 className="unselectable default-cursor uppercase">Twenty Four</h1>
      </div>
    );
  }
});

ReactDOM.render(<Title />, document.getElementsByTagName('header')[0]);
