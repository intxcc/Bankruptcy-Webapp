'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  LineChart,
  YAxis,
  XAxis,
  Line,
  Brush,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import moment from 'moment'

import { observer } from 'mobx-react'

@observer
class Chart extends Component {
  constructor (props) {
    super(props)

    const extData = require('./BTC_ETH-1800.json')

    this.data = []
    for (let i = 0; i < 1000; i++) {
      this.data.push(extData[extData.length - 1 - i])
    }
  }

  formatXAxis (tickItem) {
    return moment.unix(tickItem).format('MMM DD HH:mm')
  }

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
        <ResponsiveContainer height='100%' width='100%'>
          <LineChart
            ref={(node) => { this.chartNode = node }}
            data={this.data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis scale="date" dataKey="date" tickFormatter={this.formatXAxis} minTickGap={50} />
            <YAxis />
            <Tooltip labelFormatter={this.formatXAxis} />
            <CartesianGrid strokeDasharray="3 3"/>
            <Brush endIndex={100} />
            <Line
              name="Price"
              type="monotone"
              dataKey="weightedAverage"
              stroke="#ff7300"
              dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

Chart.propTypes = {
  store: PropTypes.object
}

export default Chart
