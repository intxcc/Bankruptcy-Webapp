'use strict'

import autobind from 'autobind-decorator'

class Plot {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  path (data) {
    let ctx = this.chart.ctx

    ctx.lineWidth = 2
    ctx.strokeStyle = this.chart.config.plotColor

    ctx.beginPath()

    let pos = this.chart.matrix.mapCoordinateToPixel(0, data[0])
    ctx.moveTo(pos.x, pos.y)
    for (let i = 0; i < data.length - 1; i++) {
      pos = this.chart.matrix.mapCoordinateToPixel(i / 100, data[i])
      ctx.lineTo(pos.x, pos.y)
    }
    ctx.stroke()
  }
}

export default Plot
