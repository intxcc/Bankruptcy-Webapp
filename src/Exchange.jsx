'use strict'

import React from 'react'

import Chart from './exchange/Chart'
import Input from './reusables/input'

const Exchange = (props) => (
  <div id="exchange_wrapper">
    <div id="exchange-search-input-wrapper">
      <span id="exchange-search-input-label">
        Search
      </span>
      <Input
        id="exchange-search-input"
        placeholder="e.g. Ethereum"
        symbol="search" />
    </div>
    <Chart />
  </div>
)

export default Exchange
