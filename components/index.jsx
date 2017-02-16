import React from 'react'
import ReactDOM from 'react-dom'

import {App} from './app.jsx'

ReactDOM.render(<App {...window.REACT_APP_DATA} />, document.getElementById('react-app'))
