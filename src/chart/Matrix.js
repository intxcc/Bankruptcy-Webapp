'use strict'

import autobind from 'autobind-decorator'

class Matrix {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  getUnitWidth () {
    return this.unitWidth
  }

  getUnitHeight () {
    return this.unitHeight
  }

  @autobind
  setDomain () {
    this.minY = Math.min(...this.chart.data)
    this.maxY = Math.max(...this.chart.data)

    let yDelta = this.maxY - this.minY

    this.minX = 0
    this.maxX = this.chart.data.length / 100 // TODO: the 100 is just for test

    let xDelta = this.maxX - this.minX

    this.chart.config.selectionBoundaries.left = this.minX - (xDelta * 0.5)
    this.chart.config.selectionBoundaries.right = this.maxX + (xDelta * 0.5)

    this.chart.config.selectionBoundaries.bottom = this.minY - (yDelta * 0.5)
    this.chart.config.selectionBoundaries.top = this.maxY + (yDelta * 0.5)
  }

  @autobind
  calculateUnitDimensions () {
    let selection = this.chart.selection.getSelection()

    this.unitWidth = this.chart.innerWidth / (selection.right - selection.left)
    this.unitHeight = this.chart.innerHeight / (selection.top - selection.bottom)
  }

  @autobind
  calculateMappingCoeffs () {
    let config = this.chart.config
    let margin = config.margin

    let selection = this.chart.selection.getSelection()

    this.marginX = margin.left + config.axisMargin
    this.selectionLeft = selection.left

    this.marginY = config.margin.top + this.chart.innerHeight - config.axisMargin
    this.selectionBottom = selection.bottom
  }

  mapPixelToCoordinate = (x, y) => ({
    x: ((x - this.marginX) / this.unitWidth) + this.selectionLeft,
    y: ((this.marginY - y) / this.unitHeight) + this.selectionBottom
  })

  mapCoordinateToPixel = (x, y) => ({
    x: this.marginX + (x - this.selectionLeft) * this.unitWidth,
    y: this.marginY - (y - this.selectionBottom) * this.unitHeight
  })
}

export default Matrix
