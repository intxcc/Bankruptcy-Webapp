'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import ExchangeChart from './exchange/ExchangeChart'
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
    <ExchangeChart store={props.store} />
  </div>
)

Exchange.propTypes = {
  store: PropTypes.object
}

export default Exchange
