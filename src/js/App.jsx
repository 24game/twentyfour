import '../styles/site.scss';
import Title from './Title.jsx';
import Game from './Game.jsx';
import GameComponent from './GameComponent.jsx';
import HowToPlay from './HowToPlay.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './utils.js';

Utils.loadJson('./data/puzzles.json')
  .then(data => {
    let puzzles = data.puzzles;
    let operators = ['+', '−', '×', '÷'];
    let event = new CustomEvent('newGame', {
      bubbles: true, cancelable: true, detail: null
    });

    ReactDOM.render(<Title />, document.querySelector('header'));
    ReactDOM.render(<Game puzzles={puzzles} operators={operators} />, document.querySelector('#game'));
    ReactDOM.render(<p onClick={window.dispatchEvent.bind(null, event)}>New Game</p>, document.querySelector('footer'));
});
