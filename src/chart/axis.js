'use strict'

import autobind from 'autobind-decorator'

import { lineNoSingle, text } from './AtomicDraws'

class Axis {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  drawXStep (x, length) {
    let ctx = this.chart.ctx

    let pos = this.chart.matrix.mapCoordinateToPixel(x, 0)
    let yPos = this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin

    lineNoSingle(ctx, pos.x, yPos, pos.x, yPos + length)
  }

  @autobind
  bottomAxis () {
    let ctx = this.chart.ctx

    let selection = this.chart.selection.getSelection()

    let left = Math.floor(selection.left)
    let right = Math.ceil(selection.right)

    // Begin path
    ctx.beginPath()

    // Draw normal line for every unit
    ctx.lineWidth = 1
    ctx.strokeStyle = this.chart.config.axisColor
    ctx.fillStyle = this.chart.config.axisColor
    for (let i = left; i <= right; i++) {
      this.drawXStep(i, 6)

      let textPos = this.chart.matrix.mapCoordinateToPixel(i, 0)
      let yPos = this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin
      text(ctx, i, textPos.x, yPos + 15)
    }

    // Draw small line for every tenth of unit
    ctx.lineWidth = 0.5
    for (let i = left * 10; i <= right * 10; i++) {
      this.drawXStep(i / 10, i % 5 === 0 ? 5 : 3)
    }

    // Apply path to canvas
    ctx.stroke()
  }

  @autobind
  drawYStep (y, length) {
    let ctx = this.chart.ctx

    let pos = this.chart.matrix.mapCoordinateToPixel(0, y)
    let xPos = this.chart.config.margin.left + this.chart.config.axisMargin
    lineNoSingle(ctx, xPos, pos.y, xPos - length, pos.y)
  }

  @autobind
  leftAxis () {
    let ctx = this.chart.ctx

    let selection = this.chart.selection.getSelection()

    let top = Math.ceil(selection.top)
    let bottom = Math.floor(selection.bottom)

    // Begin path
    ctx.beginPath()

    // Draw normal line for every unit
    ctx.lineWidth = 1
    ctx.strokeStyle = this.chart.config.axisColor
    ctx.fillStyle = this.chart.config.axisColor
    for (let i = bottom; i <= top; i++) {
      this.drawYStep(i, 5)

      let textPos = this.chart.matrix.mapCoordinateToPixel(0, i)
      let xPos = this.chart.config.margin.left + this.chart.config.axisMargin
      text(ctx, i, xPos - 15, textPos.y)
    }

    // Draw small line for every tenth of unit
    ctx.lineWidth = 0.5
    for (let i = bottom * 10; i <= top * 10; i++) {
      this.drawYStep(i / 10, i % 5 === 0 ? 5 : 3)
    }

    // Apply path to canvas
    ctx.stroke()
  }
}

export default Axis
