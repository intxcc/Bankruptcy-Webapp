'use strict'

import autobind from 'autobind-decorator'

import { line } from './AtomicDraws'

class Plot {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  path (data) {
    let ctx = this.chart.ctx

    ctx.lineWidth = 1
    ctx.strokeStyle = this.chart.config.plotColor
    for (let i in data) {
      i = parseInt(i)
      if (i + 1 < data.length) {
        let from = this.chart.matrix.mapCoordinateToPixel(i / 100, data[i])
        let to = this.chart.matrix.mapCoordinateToPixel((i + 1) / 100, data[i + 1])
        line(ctx, from.x, from.y, to.x, to.y)
      }
    }
  }
}

export default Plot
