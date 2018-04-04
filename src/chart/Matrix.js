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
    this.min = Math.min(this.chart.data)
    this.max = Math.max(this.chart.data)
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

    this.marginX = margin.left - config.axisMargin
    this.selectionLeft = selection.left

    this.marginY = config.margin.top + this.chart.innerHeight - config.axisMargin
    this.selectionBottom = selection.bottom
  }

  mapPixelToCoordinate = (x, y) => ({
    x: ((x - this.marginX) / this.unitWidth) + this.selectionLeft,
    y: ((this.marginY - y) / this.unitHeight) + this.selectionBottom
  })

  @autobind
  mapCoordinateToPixel (x, y) {
    let result = {
      x: 0,
      y: 0
    }

    let config = this.chart.config
    let margin = config.margin

    let selection = this.chart.selection.getSelection()

    result.x = margin.left + config.axisMargin + (x - selection.left) * this.unitWidth
    result.y = (margin.top + this.chart.innerHeight - config.axisMargin) - (y - selection.bottom) * this.unitHeight

    return result
  }
}

export default Matrix
