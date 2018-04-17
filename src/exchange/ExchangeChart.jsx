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
  handleSelectedPointChange (selection) {
    this.props.store.exchangeChartSelection = selection
  }

  @autobind
  handleNewDataDivClick () {
    // let newData = [5]
    // for (let i = 1; i < 2000; i++) {
    //   newData.push(newData[i - 1] + (Math.random() * 0.5) - 0.25)
    // }

    let newDataRaw = require('../testdata/BTC_ETH-1800.json')

    let newData = []
    const tempMaxDataLength = 10
    for (let i = 0; i < (newDataRaw.length > tempMaxDataLength ? tempMaxDataLength : newDataRaw.length - 1); i++) {
      newData.push(newDataRaw[i])
    }

    this.props.store.exchangeChartData = newData
    this.props.store.exchangeChartDataHasChanged = true
  }

  @autobind
  handleUnsetHasChanged () {
    this.props.store.exchangeChartDataHasChanged = false
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
        <div
          onClick={this.handleNewDataDivClick}
          id="testNewDataDiv">
          Generate random data.
        </div>
        <ChartComponent
          id="exchange-chart"
          data={this.props.store.exchangeChartData}
          dataHasChanged={this.props.store.exchangeChartDataHasChanged}
          unsetHasChanged={this.handleUnsetHasChanged}
          onSelectedPointChanged={this.handleSelectedPointChange}
          changeOnDragged={this.changeBeeingDragged}
          selection={this.props.store.exchangeChartSelection} />
      </div>
    )
  }
}

ExchangeChart.propTypes = {
  store: PropTypes.object
}

export default ExchangeChart
