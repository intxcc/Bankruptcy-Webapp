'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import { ChartComponent } from '../chart'

@observer
class ExchangeChart extends Component {
  @autobind
  changeBeeingDragged (newValue) {
    this.props.store.changeExchangeChartIsBeeingDragged(this.props.store, newValue)
  }

  @autobind
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
        <div id="chart-background"></div>
        <ChartComponent
          id="exchange-chart"
          changeOnDragged={this.changeBeeingDragged} />
      </div>
    )
  }
}

ExchangeChart.propTypes = {
  store: PropTypes.object
}

export default ExchangeChart
