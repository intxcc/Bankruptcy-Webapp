'use strict'

import autoBind from 'auto-bind'

import { line, point, text } from './AtomicDraws'

/*
* Crosshair object draws the crosshair over the current mouse position.
* @constructor
*/
class Crosshair {
  constructor (chart) {
    this.chart = chart

    this.defaultOptions = {
      clipSelectionToPath: true
    }

    // Initialize
    this.options = this.defaultOptions

    // Bind all functions to this
    autoBind(this)
  }

  setOptions (options) {
    this.options = Object.assign({}, this.options, options)
  }

  setPosition (x, y) {
    let coordinatePos = this.chart.mapPixelToCoordinate(x, y)

    // Set the coordinate we want to display the value of
    this.seletedCoordinate = coordinatePos

    if (this.options.clipSelectionToPath) {
      let x = coordinatePos.x

      // Clip to every hundreth datapoint TODO autocalculate this based on selection
      let y = this.chart.data[Math.round(Math.round(x * 100))]
      x = Math.round(x * 100) / 100

      // After clipping to the path we reset the coordinate we want to show the data of
      this.seletedCoordinate = {x: x, y: y}
    }

    this.selectionPos = this.chart.mapCoordinateToPixel(this.seletedCoordinate.x, this.seletedCoordinate.y)
  }

  drawSelection () {
    if (!this.selectionPos) {
      return
    }

    let ctx = this.chart.ctx

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'
    ctx.lineWidth = 0.5

    line(ctx, this.chart.config.margin.left + this.chart.config.axisMargin - 1, this.selectionPos.y, this.chart.innerWidth + 2, this.selectionPos.y)
    line(ctx, this.selectionPos.x, this.chart.config.margin.top + this.chart.config.axisMargin - 1, this.selectionPos.x, this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin + 2)

    ctx.strokeStyle = 'rgba(15, 15, 15, 0.5)'
    ctx.lineWidth = 1
    point(ctx, this.selectionPos.x, this.selectionPos.y, 3, true)

    let leftX = this.chart.config.margin.left + this.chart.config.axisMargin
    let leftY = this.selectionPos.y

    ctx.clearRect(leftX - 30, leftY - 7, 20, 14)

    text(ctx, Math.round(this.seletedCoordinate.y * 100) / 100, leftX - 12, leftY, {
      align: 'right',
      valign: 'middle'
    })

    let bottomX = this.selectionPos.x
    let bottomY = this.chart.innerHeight + this.chart.config.margin.top - this.chart.config.axisMargin

    ctx.clearRect(bottomX - 15, bottomY + 7, 30, 14)

    text(ctx, Math.round(this.seletedCoordinate.x * 100) / 100, bottomX, bottomY + 10, {
      align: 'center',
      valign: 'top'
    })

    ctx.strokeStyle = '#000'
  }
}

export default Crosshair
