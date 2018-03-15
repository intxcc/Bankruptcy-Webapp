'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line
import style from '../style/index.scss'

import App from './App'
import store from './Store'

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
)

module.hot.accept()
