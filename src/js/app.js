import '../styles/site.scss';
import Title from './Title.jsx';
import Game from './Game.jsx';
import HowToPlay from './HowToPlay.jsx';
import React from 'react';
import ReactDOM from 'react-dom';


var currentPuzzle = [1, 3, 4, 6];
var operators = ['+', '−', '×', '÷'];

ReactDOM.render(<Title />, document.querySelector('header'));
ReactDOM.render(<Game puzzle={currentPuzzle} possibleOperators={operators} />, document.querySelector('#game'));
ReactDOM.render(<HowToPlay />, document.querySelector('footer'));