import React from 'react';

class Instructions extends React.Component {

  render() {
    return (
      <section className="unselectable default-cursor flexible columns horizontally-centered instructions">
        <p className="larger">Use&nbsp;
          <strong className="larger">
            <code id="plus">+</code>
            <code id="minus">−</code>
            <code id="times">×</code>
            <code id="divide">÷</code>
          </strong>
          &nbsp;to make 24.</p>
        <p>
          <strong className="uppercase">Drag
          </strong>&nbsp;numbers to reorder them.</p>
        <p>
          <strong className="uppercase">Double click
          </strong>&nbsp;on a pair of numbers to wrap them in
          <strong className="large">
            <code id="left-parenthesis">(</code>
            <code id="right-parenthesis">)</code>
          </strong>.</p>
        <p>
          <strong className="uppercase">Click
          </strong>&nbsp;on the operators to cycle between them.</p>
      </section>
    );
  }

}

export default Instructions;
