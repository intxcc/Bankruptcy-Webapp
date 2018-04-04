'use strict'

import autobind from 'autobind-decorator'

import { calcPosDelta } from './misc'

class Selection {
  constructor (chart) {
    this.chart = chart

    let config = this.chart.config
    this.selection = config.defaultSelection
  }

  // --------- //
  // Selection //

  @autobind
  getSelection () {
    return this.selection
  }

  @autobind
  setSelection (selection) {
    this.selection = Object.assign({}, this.selection, selection, this.chart.config.fixedSelection)

    let boundaries = this.chart.config.selectionBoundaries

    if (this.selection.top > boundaries.top) {
      this.selection.top = boundaries.top
    }

    if (this.selection.right > boundaries.right) {
      this.selection.right = boundaries.right
    }

    if (this.selection.bottom < boundaries.bottom) {
      this.selection.bottom = boundaries.bottom
    }

    if (this.selection.left < boundaries.left) {
      this.selection.left = boundaries.left
    }

    // Recalculate some variables which are dependend on the selection
    this.chart.matrix.calculateUnitDimensions()
    this.chart.matrix.calculateMappingCoeffs()
  }

  @autobind
  moveSelectionKeepRatio (x, y) {
    // Save distances within selection
    let deltaY = this.selection.top - this.selection.bottom
    let deltaX = this.selection.right - this.selection.left

    // Apply delta given in x and y
    this.setSelection({
      top: this.selection.top - y,
      right: this.selection.right + x,
      bottom: this.selection.bottom - y,
      left: this.selection.left + x
    })

    // Reapply old distances to selection
    this.setSelection({
      top: this.selection.bottom + deltaY,
      right: this.selection.left + deltaX
    })
  }

  // ---- //
  // Drag //

  @autobind
  startDrag (x, y) {
    this.dragActive = true

    this.dragSelection = {}
    this.dragStart = {
      x: x,
      y: y
    }
    Object.assign(this.dragSelection, this.selection)
  }

  @autobind
  stopDrag () {
    this.dragActive = false
  }

  @autobind
  drag (x, y) {
    if (!this.dragActive) {
      return
    }

    // If drag is active calculate the dragged distance since dragStart
    let dragXPixel = this.dragStart.x - x
    let dragYPixel = this.dragStart.y - y

    // Convert distance to coordinated as these are the unit of the selection
    let deltaX = dragXPixel / this.chart.matrix.getUnitWidth()
    let deltaY = dragYPixel / this.chart.matrix.getUnitHeight()

    // Convert the coorinate delta between the new calculated selection and the current active
    deltaX = (this.dragSelection.left + deltaX) - this.selection.left
    deltaY = this.selection.bottom - (this.dragSelection.bottom - deltaY)

    // Apply delta while keeping selection ratio
    this.moveSelectionKeepRatio(deltaX, deltaY)
  }

  // ---- //
  // Zoom //

  /**
  * Zooms into or out of the graph
  * @param {float} delta The delta gives the amount of zoom that will be applied. Direction is given by sign. Usually this will be -3 or 3.
  * @param {integer} x X position of mouse within canvas.
  * @param {integer} y Y position of mouse within canvas.
  */
  @autobind
  zoom (delta, x, y) {
    // The deltaCoeff is used to calculate the amount of zoom
    let deltaCoeffX = this.selection.right - this.selection.left
    let deltaCoeffY = this.selection.top - this.selection.bottom

    // Calculate delta with exponential function, so it gets slower the closer the zoom is to the path
    let deltaX = delta * 0.03 * Math.pow(deltaCoeffX * 0.15, 1.1)
    let deltaY = delta * 0.03 * Math.pow(deltaCoeffY * 0.15, 1.1)

    // Used to calculate the right celection position later, to move it again under the mouse cursor
    let posBefore = this.chart.matrix.mapPixelToCoordinate(x, y)

    this.setSelection({
      top: this.selection.top + deltaY,
      right: this.selection.right + deltaX,
      bottom: this.selection.bottom - deltaY,
      left: this.selection.left - deltaX
    })

    // Calculate where the position the cursor was hovering before zooming is now on the canvas
    let posAfter = this.chart.matrix.mapCoordinateToPixel(posBefore.x, posBefore.y)

    // Calculate pixel difference between the old coordinate on the canvas and mouse position
    let posDelta = calcPosDelta({x: x, y: y}, posAfter)

    // Convert pixel difference to coordinate difference and adjust selection
    let pixelDelta = {
      x: posDelta.x / this.chart.matrix.getUnitWidth(),
      y: posDelta.y / this.chart.matrix.getUnitHeight()
    }
    this.moveSelectionKeepRatio(pixelDelta.x, pixelDelta.y)

    // Reselect because otherwise the selection won't adjust to the new zoom without moving the mouse
    this.chart.handleMouseMove(this.chart.mousePos.x, this.chart.mousePos.y)
  }
}

export default Selection
