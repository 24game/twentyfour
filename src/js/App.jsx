import '../styles/site.scss';
import Title from './Title.jsx';
import Game from './Game.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './utils.js';
import Footer from './Footer.jsx';

Utils.loadJson('./data/puzzles.json')
  .then(data => {
    let puzzles = data.puzzles;
    let operators = ['+', '−', '×', '÷'];

    ReactDOM.render(<Title />, document.querySelector('header'));
    ReactDOM.render(<Game puzzles={puzzles} operators={operators} />, document.querySelector('#game'));
    ReactDOM.render(<Footer />, document.querySelector('footer'));
});
