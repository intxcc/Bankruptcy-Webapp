'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line
import style from '../style/index.scss'

const title = 'My test!'

const App = (
  <span>{title}</span>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

module.hot.accept()
