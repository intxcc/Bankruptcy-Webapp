'use strict'

import autoBind from 'auto-bind'

import { line } from './atomicDraws'

class Plot {
  constructor (chart) {
    this.chart = chart

    autoBind(this)
  }

  path (data) {
    let ctx = this.chart.ctx

    ctx.lineWidth = 1
    ctx.strokeStyle = this.chart.config.plotColor
    for (let i in data) {
      i = parseInt(i)
      if (i + 1 < data.length) {
        let from = this.chart.mapCoordinateToPixel(i / 10, data[i])
        let to = this.chart.mapCoordinateToPixel((i + 1) / 10, data[i + 1])
        line(ctx, from.x, from.y, to.x, to.y)
      }
    }
  }
}

export default Plot
