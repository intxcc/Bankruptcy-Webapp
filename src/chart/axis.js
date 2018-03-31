'use strict'

import autoBind from 'auto-bind'

import { line, text } from './atomicDraws'

class Axis {
  constructor (chart) {
    this.chart = chart

    autoBind(this)
  }

  drawXStep (x, length) {
    let ctx = this.chart.ctx

    let pos = this.chart.mapCoordinateToPixel(x, 0)
    let yPos = this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin
    line(ctx, pos.x, yPos, pos.x, yPos + length)
  }

  bottomAxis () {
    let ctx = this.chart.ctx

    let left = Math.floor(this.chart.selection.left)
    let right = Math.ceil(this.chart.selection.right)

    // Draw normal line for every unit
    ctx.lineWidth = 1
    for (let i = left; i <= right; i++) {
      this.drawXStep(i, 6)

      let textPos = this.chart.mapCoordinateToPixel(i, 0)
      let yPos = this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin
      text(ctx, i, textPos.x, yPos + 15)
    }

    // Draw small line for every tenth of unit
    ctx.lineWidth = 0.5
    for (let i = left * 10; i <= right * 10; i++) {
      this.drawXStep(i / 10, i % 5 === 0 ? 5 : 3)
    }
  }

  drawYStep (y, length) {
    let ctx = this.chart.ctx

    let pos = this.chart.mapCoordinateToPixel(0, y)
    let xPos = this.chart.config.margin.left + this.chart.config.axisMargin
    line(ctx, xPos, pos.y, xPos - length, pos.y)
  }

  leftAxis () {
    let ctx = this.chart.ctx

    let top = Math.ceil(this.chart.selection.top)
    let bottom = Math.floor(this.chart.selection.bottom)

    let step = 1
    let diff = top - bottom
    if (diff > 20) {
      step = 10
    }

    // Draw normal line for every unit
    ctx.lineWidth = 1
    for (let i = bottom; i <= top; i++) {
      if (i % step === 0) {
        this.drawYStep(i, 5)

        let textPos = this.chart.mapCoordinateToPixel(0, i)
        let xPos = this.chart.config.margin.left + this.chart.config.axisMargin
        text(ctx, i, xPos - 15, textPos.y)
      }

      this.drawYStep(i, 3)

      if (i % (step / 2) === 0) {
        this.drawYStep(i, 5)
      }
    }
  }
}

export default Axis
