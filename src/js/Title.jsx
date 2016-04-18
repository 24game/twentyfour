import React from 'react';

class Title extends React.Component {

  render() {
    return (
      <div className="unselectable centered title">
        <h1 className="default-cursor uppercase">Twenty Four</h1>
        <h3 className="larger">Use&nbsp;
            <strong className="larger">
              <code id="plus">+</code>
              <code id="minus">−</code>
              <code id="times">×</code>
              <code id="divide">÷</code>
            </strong>
            &nbsp;to make 24.
        </h3>
      </div>
    )
  }

}

export default Title;
