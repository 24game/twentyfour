import React from 'react';

class Instructions extends React.Component {

  render() {
    return (
      <section className="centered footer-details">
        <p>
          <strong className="uppercase">Drag
          </strong>&nbsp;number tiles to reorder them.
        </p>
        <p>
          <strong className="uppercase">Click
          </strong>&nbsp;on operators to cycle between them.
        </p>
        <p>
          <strong className="uppercase">Double click
          </strong>&nbsp;on number tiles to toggle parentheses.
        </p>
      </section>
    );
  }

}

export default Instructions;
