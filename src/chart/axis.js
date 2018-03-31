'use strict'

import { line, text } from './atomic.js'

class Axis {
  constructor (chart) {
    this.chart = chart

    this.bottomAxis = this.bottomAxis.bind(this)
  }

  bottomAxis () {
    let ctx = this.chart.ctx

    let start = Math.floor(this.chart.selection.left)
    let end = Math.ceil(this.chart.selection.right)

    // Draw normal line for every unit
    ctx.lineWidth = 1
    for (let i = start; i <= end; i++) {
      let from = this.chart.mapCoordinateToPixel(i, 0)
      let to = this.chart.mapCoordinateToPixel(i, 10)

      line(ctx, from.x, from.y, to.x, to.y)

      text(ctx, i, from.x, from.y + 14)
    }
  }
}

export default Axis
