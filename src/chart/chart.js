'use strict'

import autobind from 'autobind-decorator'

import Config from './Config'

import Matrix from './Matrix'
import Grid from './Grid'
import Axis from './Axis'
import Selection from './Selection'
import Plot from './Plot'
import Crosshair from './Crosshair'
import FpsCounter from './FpsCounter'
import Draw from './Draw'

class Chart {
  constructor (props) {
    this.ctx = props.ctx
    this.canvasNode = props.canvasNode
    this.onSelectedPointChanged = props.onSelectedPointChanged

    this.initialize()
  }

  @autobind
  initialize () {
    // Initialize config
    this.config = Config

    // Initialize objects
    this.matrix = new Matrix(this)
    this.grid = new Grid(this)
    this.axis = new Axis(this)
    this.selection = new Selection(this)
    this.plot = new Plot(this)
    this.crosshair = new Crosshair(this)
    this.fpsCounter = new FpsCounter(this)
    this.draw = new Draw(this)

    // Initialize chart
    // this.matrix.setDomain()
    // this.selection.setSelection(0, this.data.length - 1) // TODO: uncomment again

    // TEST STUFF //

    this.data = [5]
    for (let i = 1; i < 2000; i++) {
      this.data.push(this.data[i - 1] + (Math.random() * 0.5) - 0.25)
    }

    this.matrix.setDomain()

    // END TEST STUFF //

    // Initialize size
    this.resize()

    // Initialize selection
    setTimeout(this.selection.defaultSelectionToEnd, 200)

    // Nudge drawing
    this.draw.handleDraw()
  }

  @autobind
  handleDoubleClick (x, y) {
    if (this.crosshair.fixedPoint) {
      this.crosshair.fixedPoint = false
    } else {
      this.crosshair.fixPosition()
    }
  }

  @autobind
  handleMouseMove (x, y) {
    this.mousePos = {
      x: x,
      y: y
    }

    this.crosshair.setPosition(x, y)
  }

  @autobind
  handleResize () {
    // Use this to throttle resizing
    if (!this.resizeTimeout) {
      this.resizeTimeout = setTimeout(this.resize, 100)

      // Force draw to enhance perceived responsiveness and prevent flickering
      this.resizeTimeout = setTimeout(this.draw.forceDraw, 100)
    }
  }

  @autobind
  resize () {
    this.lastResize = (new Date()).getTime()

    // Adjust height and width to actual pixel size
    let oldHeight = this.height
    let oldWidth = this.width

    this.height = this.canvasNode.height = this.canvasNode.clientHeight
    this.width = this.canvasNode.width = this.canvasNode.clientWidth

    this.innerHeight = this.height - this.config.margin.top - this.config.margin.bottom
    this.innerWidth = this.width - this.config.margin.right - this.config.margin.left

    let hasChanged = oldHeight !== this.height || oldWidth !== this.width
    if (hasChanged || !this.selection.ratio) {
      // Start with the same x-y-ratio as the canvas has and reset on resize
      this.selection.resetRatio()
    }

    this.matrix.calculateUnitDimensions()

    // Reset timeout, so a new resize can be requested again
    this.resizeTimeout = false
  }
}

export default Chart
