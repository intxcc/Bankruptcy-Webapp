'use strict'

import React from 'react'
import PropTypes from 'prop-types'

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
    <Chart store={props.store} />
  </div>
)

Exchange.propTypes = {
  store: PropTypes.object
}

export default Exchange
