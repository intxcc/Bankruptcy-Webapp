'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ExchangeChart from './exchange/ExchangeChart'
import Input from './reusables/input'

@observer
class Exchange extends Component {
  render () {
    let searchInputClassName = ''

    if (this.props.store.exchangeChartIsBeeingDragged) {
      searchInputClassName = 'no-pointer-events'
    }

    return (
      <div id="exchange_wrapper">
        <div id="exchange-search-input-wrapper" className={searchInputClassName}>
          <span id="exchange-search-input-label">
            Search
          </span>
          <Input
            id="exchange-search-input"
            placeholder="e.g. Ethereum"
            symbol="search" />
        </div>
        <ExchangeChart store={this.props.store} />
      </div>
    )
  }
}

Exchange.propTypes = {
  store: PropTypes.object
}

export default Exchange
