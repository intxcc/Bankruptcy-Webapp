'use strict'

import autobind from 'autobind-decorator'

import { line, text, point } from './AtomicDraws'

/*
* Crosshair object draws the crosshair over the current mouse position.
* @constructor
*/
class Crosshair {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  clear () {
    this.crosshairPos = false
  }

  @autobind
  setPosition (x, y) {
    let coordinatePos = this.chart.matrix.mapPixelToCoordinate(x, y)

    // Set the coordinate we want to display the value of

    // ------------- //
    // Free position //
    this.crosshairFreeCoordinate = coordinatePos
    this.crosshairFreePos = this.chart.matrix.mapCoordinateToPixel(this.crosshairFreeCoordinate.x, this.crosshairFreeCoordinate.y)

    // ---------------- //
    // Clipped position //
    x = coordinatePos.x

    // Clip to every hundreth datapoint TODO autocalculate this based on selection
    y = this.chart.data[Math.round(Math.round(x * 100))]
    x = Math.round(x * 100) / 100

    // After clipping to the path we reset the coordinate we want to show the data of
    this.pointClippedCoordinate = {x: x, y: y}
    this.pointClippedPos = this.chart.matrix.mapCoordinateToPixel(this.pointClippedCoordinate.x, this.pointClippedCoordinate.y)
  }

  @autobind
  drawClippedPoint () {
    let ctx = this.chart.ctx

    ctx.strokeStyle = this.chart.config.pointColor
    ctx.fillStyle = this.chart.config.pointColor
    ctx.lineWidth = this.chart.config.pointLineWidth
    point(ctx, this.pointClippedPos.x, this.pointClippedPos.y, this.chart.config.pointSize, !this.chart.config.pointFilled)

    // ctx.strokeStyle = '#f00'
    // line(ctx, this.pointClippedPos.x, this.pointClippedPos.y, this.pointClippedPos.x, this.crosshairFreePos.y)
  }

  @autobind
  drawFreeCrosshair () {
    let ctx = this.chart.ctx

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.lineWidth = 0.5

    line(ctx, this.chart.config.margin.left + this.chart.config.axisMargin - 1, this.crosshairFreePos.y, this.chart.innerWidth + 2, this.crosshairFreePos.y)
    line(ctx, this.crosshairFreePos.x, this.chart.config.margin.top + this.chart.config.axisMargin - 1, this.crosshairFreePos.x, this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin + 2)

    ctx.strokeStyle = 'rgba(15, 15, 15, 0.5)'
    ctx.lineWidth = 1
    // point(ctx, this.crosshairFreePos.x, this.crosshairFreePos.y, 3, true)

    let leftX = this.chart.config.margin.left + this.chart.config.axisMargin
    let leftY = this.crosshairFreePos.y

    ctx.clearRect(leftX - 30, leftY - 7, 20, 14)

    text(ctx, Math.round(this.crosshairFreeCoordinate.y * 100) / 100, leftX - 12, leftY, {
      align: 'right',
      valign: 'middle'
    })

    let bottomX = this.crosshairFreePos.x
    let bottomY = this.chart.innerHeight + this.chart.config.margin.top - this.chart.config.axisMargin

    ctx.clearRect(bottomX - 15, bottomY + 7, 30, 14)

    text(ctx, Math.round(this.crosshairFreeCoordinate.x * 100) / 100, bottomX, bottomY + 10, {
      align: 'center',
      valign: 'top'
    })

    ctx.strokeStyle = '#000'
  }

  @autobind
  drawCrosshair () {
    if (this.chart.config.showFreeCrosshair && this.crosshairFreePos) {
      this.drawFreeCrosshair()
    }

    if (this.chart.config.showClippedPoint && this.pointClippedPos) {
      this.drawClippedPoint()
    }
  }
}

export default Crosshair
