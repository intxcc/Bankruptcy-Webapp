'use strict'

import autoBind from 'auto-bind'

import { line, point } from './atomicDraws'

/*
* Crosshair object draws the crosshair over the current mouse position.
* @constructor
*/
class Crosshair {
  constructor (chart) {
    this.chart = chart

    autoBind(this)
  }

  selectX (x) {
    // TODO this is just test
    let y = this.chart.data[Math.round(Math.round(x * 100))]

    this.selectionPos = this.chart.mapCoordinateToPixel(Math.round(x * 100) / 100, y)
  }

  drawSelection () {
    if (!this.selectionPos) {
      return
    }

    let ctx = this.chart.ctx

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.lineWidth = 0.5

    line(ctx, 0, this.selectionPos.y, this.chart.width, this.selectionPos.y)
    line(ctx, this.selectionPos.x, 0, this.selectionPos.x, this.chart.height)

    ctx.strokeStyle = 'rgba(15, 15, 15, 0.5)'
    ctx.lineWidth = 1
    point(ctx, this.selectionPos.x, this.selectionPos.y, 3, true)

    ctx.strokeStyle = '#000'
  }
}

export default Crosshair
