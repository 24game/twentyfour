import '../styles/site.scss';

import Title from './Title.jsx'
import Tile from './Tile.jsx'
import Tiles from './Tiles.jsx'
import Operator from './Operator.jsx'
import HowToPlay from './HowToPlay.jsx'
import Instructions from './Instructions.jsx'

import React from 'react'

var currentPuzzle = [
  {value: 1},
  {value: 3},
  {value: 4},
  {value: 6}
];

React.render(<Title />, document.getElementsByTagName('header')[0]);
React.render(<Operator/>, document.getElementById('game'));
React.render(<Tiles puzzle={currentPuzzle} />, document.getElementById('game'));
React.render(<HowToPlay/>, document.getElementsByTagName('footer')[0]);
