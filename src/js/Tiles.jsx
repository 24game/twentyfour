import Tile from './Tile.jsx'
import React from 'react';

var Tiles = React.createClass({
  render: function() {
    return (
      <section className="flexible rows horizontally-centered vertically-centered game">
        {this.props.puzzle.map(function(number) {
          return (
            <Tile value={number.value} />
          );
        })}
      </section>
    );
  }
});

export default Tiles;
