import '../styles/site.scss';
import Title from './Title.jsx';
import Game from './Game.jsx';
import GameComponent from './GameComponent.jsx';
import HowToPlay from './HowToPlay.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './utils.js';

Utils.loadJson('./data/puzzles.json')
  .done(data => {
    let puzzles = data.puzzles;
    let operators = ['+', '−', '×', '÷'];

    ReactDOM.render(<Title />, document.querySelector('header'));
    ReactDOM.render(<GameComponent puzzles={puzzles} operators={operators} />, document.querySelector('#game'));
    ReactDOM.render(<HowToPlay />, document.querySelector('footer'));
});
