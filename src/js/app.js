import '../styles/site.scss';

import Title from './Title.jsx'
import Tile from './Tile.jsx'
import Operator from './Operator.jsx'
import HowToPlay from './HowToPlay.jsx'
import Instructions from './Instructions.jsx'

import React from 'react'

React.render(<Title/>, document.getElementsByTagName('header')[0]);
React.render(<Operator/>, document.getElementById('game'));
React.render(<Tile/>, document.getElementById('game'));
React.render(<HowToPlay/>, document.getElementsByTagName('footer')[0]);
