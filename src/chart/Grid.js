'use strict'

import autobind from 'autobind-decorator'

import { lineNoSingle } from './AtomicDraws'

class Grid {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  drawGrid () {
    let ctx = this.chart.ctx

    let selection = this.chart.selection.getSelection()

    let top = Math.ceil(selection.top)
    let bottom = Math.floor(selection.bottom)

    ctx.beginPath()

    // Set stroke style
    ctx.lineWidth = this.chart.config.grid.lineWidth
    ctx.strokeStyle = this.chart.config.grid.strokeStyle

    for (let i = bottom; i <= top; i++) {
      let yPos = this.chart.matrix.mapCoordinateToPixel(0, i).y
      lineNoSingle(ctx, 0, yPos, this.chart.width, yPos)
    }

    let left = Math.ceil(selection.left)
    let right = Math.floor(selection.right)

    for (let i = left; i <= right; i++) {
      let xPos = this.chart.matrix.mapCoordinateToPixel(i, 0).x
      lineNoSingle(ctx, xPos, 0, xPos, this.chart.height)
    }

    ctx.stroke()
  }
}

export default Grid
