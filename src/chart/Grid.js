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

    let scaleStep = this.chart.selection.getScaleStep()
    let scale = this.chart.selection.getScale()

    let top = Math.ceil(selection.top / scaleStep) * scaleStep
    let bottom = Math.floor(selection.bottom / scaleStep) * scaleStep

    let left = Math.floor(selection.left / scaleStep) * scaleStep
    let right = Math.ceil(selection.right / scaleStep) * scaleStep

    let topMargin = this.chart.config.margin.top + this.chart.config.axisMargin + this.chart.config.axisPadding

    let rightMargin = this.chart.config.margin.right + this.chart.config.axisMargin + this.chart.config.axisPadding
    let rightMarginX = this.chart.width - rightMargin

    let bottomMargin = this.chart.config.margin.bottom + this.chart.config.axisMargin + this.chart.config.axisPadding
    let bottomMarginY = this.chart.height - bottomMargin

    let leftMargin = this.chart.config.margin.left + this.chart.config.axisMargin + this.chart.config.axisPadding

    // ------- //
    // SUBGRID //

    // Set stroke style for sub strokes
    ctx.lineWidth = ((10 - (scale / scaleStep)) / 10) * this.chart.config.grid.subLineWidth
    ctx.strokeStyle = this.chart.config.grid.strokeStyle

    ctx.beginPath()

    for (let i = bottom; i <= top; i += scaleStep / 10) {
      let yPos = this.chart.matrix.mapCoordinateToPixel(0, i).y

      if (yPos > bottomMarginY || yPos < topMargin) {
        continue
      }

      lineNoSingle(ctx, leftMargin, yPos, rightMarginX, yPos)
    }

    for (let i = left; i <= right; i += scaleStep / 10) {
      let xPos = this.chart.matrix.mapCoordinateToPixel(i, 0).x

      if (xPos < leftMargin || xPos > rightMarginX) {
        continue
      }

      lineNoSingle(ctx, xPos, topMargin - 2, xPos, this.chart.height - bottomMargin)
    }

    ctx.stroke()

    // ---- //
    // GRID //

    ctx.beginPath()

    // Set stroke style
    ctx.lineWidth = this.chart.config.grid.lineWidth
    ctx.strokeStyle = this.chart.config.grid.strokeStyle

    for (let i = bottom; i <= top; i += scaleStep) {
      let yPos = this.chart.matrix.mapCoordinateToPixel(0, i).y

      if (yPos > bottomMarginY || yPos < topMargin) {
        continue
      }

      lineNoSingle(ctx, leftMargin, yPos, rightMarginX, yPos)
    }

    for (let i = left; i <= right; i += scaleStep) {
      let xPos = this.chart.matrix.mapCoordinateToPixel(i, 0).x

      if (xPos < leftMargin || xPos > rightMarginX) {
        continue
      }

      lineNoSingle(ctx, xPos, topMargin - 2, xPos, this.chart.height - bottomMargin)
    }

    ctx.stroke()
  }
}

export default Grid
