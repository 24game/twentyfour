import React from 'react'


// The set of instructions for the game.
var Instructions = React.createClass({
  render: function() {
    return (
        <section className="unselectable default-cursor flexible columns horizontally-centered instructions">
          <p className="larger">Use <strong className="larger">
              <code id="plus">&#x0002B;</code>
              <code id="minus">&#x02212;</code>
              <code id="times">&#x000D7;</code>
              <code id="divide">&#x000F7;</code>
            </strong> to make 25.</p>
          <p>
            <strong className="uppercase">Click </strong>on a pair of numbers to swap them.</p>
          <p>
            <strong className="uppercase">Double click </strong>on a pair of numbers to wrap them in
            <strong className="large">
              <code id="left-parenthesis">&#x00028;</code>
              <code id="right-parenthesis">&#x00029;</code>
            </strong>.</p>
          <p>
            <strong className="uppercase">Click </strong>on the operators to cycle between them.</p>
        </section>
    );
  }
});

export default Instructions;
