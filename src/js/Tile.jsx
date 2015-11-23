var Tile = React.createClass({
  getInitialState: function() {
    return {
      value: '1',
      swappable: false,
      parenthesizable: false
    };
  },

  toggleSwappable: function() {
    this.setState({
      swappable: !this.state.swappable
    });
  },

  toggleParenthesizable: function() {
    this.setState({
      parenthesizable: !this.state.parenthesizable
    });
  },

  render: function() {
    return (
      <div onClick={this.toggleSwappable} onDoubleClick={this.toggleParenthesizable}>{this.state.value}</div>
    )
  }
});

React.render(<Tile />, document.getElementById("tiles"));
