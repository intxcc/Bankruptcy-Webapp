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

    this.pointClippedPos = {x: 0, y: 0}
    this.lastPointClippedPos = this.pointClippedPos
  }

  @autobind
  clear () {
    this.crosshairPos = false
  }

  @autobind
  fixPosition () {
    if (!isNaN(this.pointClippedPos.y) && !isNaN(this.pointClippedPos.x)) {
      if (!this.fixedPoint) {
        this.fixedPoint = this.pointClippedCoordinate
      } else {
        this.fixedPoint = false
      }
    }
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

    // Clip to every hundreth datapoint TODO: autocalculate this based on selection
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

    // If the clip position changed fire onSelectedPointChanged event
    if ((this.lastPointClippedPos.x !== this.pointClippedPos.x || this.lastPointClippedPos.y !== this.pointClippedPos.y)) {
      if (!isNaN(this.pointClippedPos.y) && !isNaN(this.pointClippedPos.x)) {
        this.chart.onSelectedPointChanged(this.pointClippedPos, this.pointClippedCoordinate)
      } else if ((isNaN(this.pointClippedPos.y) || isNaN(this.pointClippedPos.x)) && this.fixedPointPos) {
        this.chart.onSelectedPointChanged(this.fixedPointPos, this.fixedPoint)
      }
    }

    // Remember last clipped position, so we know when it changed
    this.lastPointClippedPos = this.pointClippedPos

    // Fixed point
    if (this.fixedPoint) {
      this.fixedPointPos = this.chart.matrix.mapCoordinateToPixel(this.fixedPoint.x, this.fixedPoint.y)
      point(ctx, this.fixedPointPos.x, this.fixedPointPos.y, this.chart.config.pointSize, !this.chart.config.pointFilled)

      // Draw difference between fixed point and the point clipped to the graph
      if (!isNaN(this.pointClippedPos.y) && !isNaN(this.pointClippedPos.x)) {
        ctx.lineWidth = this.chart.config.pointLineWidth * 0.8
        line(ctx, this.fixedPointPos.x, this.fixedPointPos.y, this.crosshairFreePos.x, this.fixedPointPos.y)

        let percent = this.pointClippedCoordinate.y / this.fixedPoint.y
        let fX = this.fixedPoint.x
        let cX = this.pointClippedCoordinate.x

        if (cX < fX) {
          percent = this.fixedPoint.y / this.pointClippedCoordinate.y
        }

        let deltaY = Math.round(((percent) * 100 - 100) * 100) / 100
        text(ctx, ' ' + deltaY + ' % ', this.crosshairFreePos.x, this.fixedPointPos.y, {
          align: cX > fX ? 'right' : 'left',
          valign: 'bottom',
          fontFamily: 'Love Ya Like A Sister',
          size: '14px'
        })
      }
    }
  }

  @autobind
  drawFreeCrosshair () {
    let ctx = this.chart.ctx

    ctx.strokeStyle = this.chart.config.crosshairHorizontalColor
    ctx.lineWidth = 0.2

    line(ctx, this.chart.config.margin.left + this.chart.config.axisMargin - 1, this.crosshairFreePos.y, this.chart.innerWidth + this.chart.config.margin.left - this.chart.config.axisMargin + 2, this.crosshairFreePos.y)

    ctx.lineWidth = 0.8
    ctx.strokeStyle = this.chart.config.crosshairVerticalColor
    line(ctx, this.crosshairFreePos.x, this.chart.config.margin.top + this.chart.config.axisMargin - 1, this.crosshairFreePos.x, this.chart.config.margin.top + this.chart.innerHeight - this.chart.config.axisMargin + 2)

    // ctx.strokeStyle = '#f55' // 'rgba(15, 15, 15, 0.5)'
    // ctx.lineWidth = 1
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
