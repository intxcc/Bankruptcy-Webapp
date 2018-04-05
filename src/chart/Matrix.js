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
    this.min = Math.min(...this.chart.data)
    this.max = Math.max(...this.chart.data)

    this.chart.config.selectionBoundaries.left = -1
    this.chart.config.selectionBoundaries.right = this.chart.data.length / 100 + 1
    this.chart.config.selectionBoundaries.top = this.max + 1
    this.chart.config.selectionBoundaries.bottom = this.min - 1
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
