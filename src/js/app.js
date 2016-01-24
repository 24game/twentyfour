import '../styles/site.scss';
import Title from './Title.jsx';
import Game from './Game.jsx';
import HowToPlay from './HowToPlay.jsx';
import React from 'react';
import Utils from './utils.js';

var fullPuzzles = Utils.loadJson('./data/puzzles.json').puzzles;
var currentPuzzle = Utils.randomize(Utils.getNewPuzzle(fullPuzzles));
var operators = ['+', '−', '×', '÷'];

React.render(<Title />, document.getElementsByTagName('header')[0]);
React.render(<Game puzzle={currentPuzzle} possibleOperators={operators} />, document.getElementById('game'));
React.render(<HowToPlay />, document.getElementsByTagName('footer')[0]);
