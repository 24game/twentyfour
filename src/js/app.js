import '../styles/site.scss';
import Title from './Title.jsx';
import Game from './Game.jsx';
import HowToPlay from './HowToPlay.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './utils.js';

Utils.loadJson('./data/puzzles.json')
  .done(data => {
    let puzzle = data.puzzles[0].numberTiles;
    let operators = ['+', '−', '×', '÷'];

    ReactDOM.render(<Title />, document.querySelector('header'));
    ReactDOM.render(<Game puzzle={puzzle} operators={operators} />, document.querySelector('#game'));
    ReactDOM.render(<HowToPlay />, document.querySelector('footer'));
  });