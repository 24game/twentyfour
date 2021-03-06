import React from 'react';

class Title extends React.Component {

  render() {
    return (
      <div className="unselectable default-cursor centered title">
        <h1 className="uppercase">Twenty Four</h1>
        <h3>use&nbsp;
            <strong className="larger subtitle-operators">
              <code id="plus">+</code>
              <code id="minus">−</code>
              <code id="times">×</code>
              <code id="divide">÷</code>
            </strong>
            &nbsp;to make 24
        </h3>
      </div>
    )
  }

}

export default Title;
