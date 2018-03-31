'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import { Chart } from '../chart'

@observer
class ExchangeChart extends Component {
  render () {
    let className = ''

    if (this.props.store.mainShowSideMenu) {
      className += 'open-main-side-menu '
    }

    if (this.props.store.mainPinSideMenu) {
      className += 'pin-main-side-menu '
    }

    if (this.props.store.mainHeaderCollapsed) {
      className += 'collapse-main-header '
    }

    return (
      <div
        id="exchange_chart_wrapper"
        className={className}>
        <Chart id="exchange-chart-canvas" />
      </div>
    )
  }
}

ExchangeChart.propTypes = {
  store: PropTypes.object
}

export default ExchangeChart