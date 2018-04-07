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
  handleSelectedPointChange (pos, coordinate) {
    this.props.store.exchangeChartSelectionCoordinate = coordinate
    this.props.store.exchangeChartSelection = pos
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

    let overlayInfo = ''
    if (this.props.store.exchangeChartSelection) {
      // TODO: THIS SHOULD BE PART OF CHARTCOMPONENT
      overlayInfo = (
        <div id="overlay-info" style={{
          top: this.props.store.exchangeChartSelection.y + 'px',
          left: this.props.store.exchangeChartSelection.x + 'px'
        }}>
          ({this.props.store.exchangeChartSelectionCoordinate.x} | {Math.round(this.props.store.exchangeChartSelectionCoordinate.y * 100) / 100})
        </div>
      )
    }

    return (
      <div
        id="exchange_chart_wrapper"
        className={className}>
        <div id="chart-background"></div>
        <ChartComponent
          id="exchange-chart"
          onSelectedPointChanged={this.handleSelectedPointChange}
          changeOnDragged={this.changeBeeingDragged} />
        <div id="chart-foreground">
          {overlayInfo}
        </div>
      </div>
    )
  }
}

ExchangeChart.propTypes = {
  store: PropTypes.object
}

export default ExchangeChart
