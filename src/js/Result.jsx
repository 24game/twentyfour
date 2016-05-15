import React from 'react';

class Result extends React.Component {

  constructor(props) {
    super(props);
  }

  getNewGame() {
    console.warn("here");
    let event = new CustomEvent('newGame', {
      bubbles: true, cancelable: true, detail: null
    });
    window.dispatchEvent(event);
  }

  render() {
    let className = "default-cursor unselectable result";
    let value = this.props.value === "null" ? "ಠ_ಠ" : this.props.value;
    if (value === "24") {
      className += " large success";
      setTimeout(() => {
        this.getNewGame();
      }, 3000);
    }

    return (
      <div className="result-display">
        <span className={className}>{value}</span>
      </div>
    );
  }

}

Result.propTypes = {
  value: React.PropTypes.string.isRequired
};

export default Result;
