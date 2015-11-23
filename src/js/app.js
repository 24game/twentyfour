import '../styles/site.scss';

import Instructions from './Instructions.jsx'
import HowToPlay from './HowToPlay.jsx'
import Operator from './Operator.jsx'

import React from 'react'

React.render(<Operator/>, document.getElementById('game'));
React.render(<HowToPlay/>, document.getElementsByTagName('footer')[0]);
