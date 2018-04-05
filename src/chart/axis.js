'use strict'

import autobind from 'autobind-decorator'

import { lineNoSingle, text } from './AtomicDraws'

class Axis {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  drawXStep (x, y, length) {
    lineNoSingle(this.chart.ctx, x, y, x, y + length)
  }

  @autobind
  bottomAxis () {
    let ctx = this.chart.ctx

    let selection = this.chart.selection.getSelection()
    let scaleStep = this.chart.selection.getScaleStep()

    let left = Math.floor(selection.left / scaleStep) * scaleStep
    let right = Math.ceil(selection.right / scaleStep) * scaleStep

    let rightMargin = this.chart.config.margin.right + this.chart.config.axisMargin + this.chart.config.axisPadding
    let rightMarginX = this.chart.width - rightMargin

    let leftMargin = this.chart.config.margin.left + this.chart.config.axisMargin

    let yPos = this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin

    // Begin path
    ctx.beginPath()

    // Draw normal line for every unit
    ctx.lineWidth = 1
    ctx.strokeStyle = this.chart.config.axisColor
    ctx.fillStyle = this.chart.config.axisColor
    for (let i = left; i <= right; i += scaleStep) {
      let posX = this.chart.matrix.mapCoordinateToPixel(i, 0).x

      if (posX < leftMargin || posX > rightMarginX) {
        continue
      }

      this.drawXStep(posX, yPos, 6)

      let textString = Math.round(i / scaleStep) * scaleStep
      textString = Math.round(textString * 10000) / 10000
      text(ctx, textString, posX, yPos + 15)
    }

    // Draw small line for every tenth of unit
    ctx.lineWidth = 0.5
    for (let i = left; i <= right; i += scaleStep / 10) {
      let posX = this.chart.matrix.mapCoordinateToPixel(i, 0).x

      if (posX < leftMargin || posX > rightMarginX) {
        continue
      }

      this.drawXStep(posX, yPos, 3)
    }

    // Apply path to canvas
    ctx.stroke()
  }

  // @autobind
  // drawYStep (y, length) {
  //   let ctx = this.chart.ctx

  //   let pos = this.chart.matrix.mapCoordinateToPixel(0, y)
  //   let xPos = this.chart.config.margin.left + this.chart.config.axisMargin
  //   lineNoSingle(ctx, xPos, pos.y, xPos - length, pos.y)
  // }

  @autobind
  drawYStep (x, y, length) {
    lineNoSingle(this.chart.ctx, x, y, x - length, y)
  }

  @autobind
  leftAxis () {
    let ctx = this.chart.ctx

    let selection = this.chart.selection.getSelection()
    let scaleStep = this.chart.selection.getScaleStep()

    let top = Math.ceil(selection.top / scaleStep) * scaleStep
    let bottom = Math.floor(selection.bottom / scaleStep) * scaleStep

    let topMargin = this.chart.config.margin.top + this.chart.config.axisMargin + this.chart.config.axisPadding

    let bottomMargin = this.chart.config.margin.bottom + this.chart.config.axisMargin + this.chart.config.axisPadding
    let bottomMarginY = this.chart.height - bottomMargin

    let xPos = this.chart.config.margin.left + this.chart.config.axisMargin

    // Begin path
    ctx.beginPath()

    // Draw normal line for every unit
    ctx.lineWidth = 1
    ctx.strokeStyle = this.chart.config.axisColor
    ctx.fillStyle = this.chart.config.axisColor
    for (let i = bottom; i <= top; i += scaleStep) {
      let yPos = this.chart.matrix.mapCoordinateToPixel(0, i).y

      if (yPos < topMargin || yPos > bottomMarginY) {
        continue
      }

      this.drawYStep(xPos, yPos, 5)

      let textString = Math.round(i / scaleStep) * scaleStep
      textString = Math.round(textString * 10000) / 10000
      text(ctx, textString, xPos - 15, yPos)
    }

    // Draw small line for every tenth of unit
    ctx.lineWidth = 0.5
    for (let i = bottom; i <= top; i += scaleStep / 10) {
      let yPos = this.chart.matrix.mapCoordinateToPixel(0, i).y

      if (yPos < topMargin || yPos > bottomMarginY) {
        continue
      }

      this.drawYStep(xPos, yPos, 3)
    }

    // Apply path to canvas
    ctx.stroke()
  }
}

export default Axis
