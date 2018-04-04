'use strict'

import autobind from 'autobind-decorator'

import { line, text } from './AtomicDraws'

/*
* Crosshair object draws the crosshair over the current mouse position.
* @constructor
*/
class Crosshair {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  setPosition (x, y) {
    let coordinatePos = this.chart.matrix.mapPixelToCoordinate(x, y)

    // Set the coordinate we want to display the value of
    this.crosshairCoordinate = coordinatePos

    if (this.chart.config.clipCrosshairToPath) {
      let x = coordinatePos.x

      // Clip to every hundreth datapoint TODO autocalculate this based on selection
      let y = this.chart.data[Math.round(Math.round(x * 100))]
      x = Math.round(x * 100) / 100

      // After clipping to the path we reset the coordinate we want to show the data of
      this.crosshairCoordinate = {x: x, y: y}
    }

    this.crosshairPos = this.chart.matrix.mapCoordinateToPixel(this.crosshairCoordinate.x, this.crosshairCoordinate.y)
  }

  @autobind
  drawCrosshair () {
    if (!this.crosshairPos) {
      return
    }

    let ctx = this.chart.ctx

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.lineWidth = 0.5

    line(ctx, this.chart.config.margin.left + this.chart.config.axisMargin - 1, this.crosshairPos.y, this.chart.innerWidth + 2, this.crosshairPos.y)
    line(ctx, this.crosshairPos.x, this.chart.config.margin.top + this.chart.config.axisMargin - 1, this.crosshairPos.x, this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin + 2)

    ctx.strokeStyle = 'rgba(15, 15, 15, 0.5)'
    ctx.lineWidth = 1
    // point(ctx, this.crosshairPos.x, this.crosshairPos.y, 3, true)

    let leftX = this.chart.config.margin.left + this.chart.config.axisMargin
    let leftY = this.crosshairPos.y

    ctx.clearRect(leftX - 30, leftY - 7, 20, 14)

    text(ctx, Math.round(this.crosshairCoordinate.y * 100) / 100, leftX - 12, leftY, {
      align: 'right',
      valign: 'middle'
    })

    let bottomX = this.crosshairPos.x
    let bottomY = this.chart.innerHeight + this.chart.config.margin.top - this.chart.config.axisMargin

    ctx.clearRect(bottomX - 15, bottomY + 7, 30, 14)

    text(ctx, Math.round(this.crosshairCoordinate.x * 100) / 100, bottomX, bottomY + 10, {
      align: 'center',
      valign: 'top'
    })

    ctx.strokeStyle = '#000'
  }
}

export default Crosshair
