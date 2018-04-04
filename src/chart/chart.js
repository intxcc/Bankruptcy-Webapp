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

    // Set parameters
    this.fps = this.config.defaultFPS

    // Initialize Variables
    this.lastFrameTime = 0

    // Initialize chart
    // this.matrix.setDomain()
    // this.selection.setSelection(0, this.data.length - 1) // TODO uncomment again

    // TEST STUFF //

    this.data = [5]
    for (let i = 1; i < 2000; i++) {
      this.data.push(this.data[i - 1] + (Math.random() * 0.5) - 0.25)
    }

    this.matrix.setDomain()

    // END TEST STUFF //

    // Initialize size
    this.resize()

    // Nudge drawing
    this.handleDraw()
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
      this.resizeTimeout = setTimeout(this.forceDraw, 100)
    }
  }

  @autobind
  resize () {
    this.lastResize = (new Date()).getTime()

    // Adjust height and width to actual pixel size
    this.height = this.canvasNode.height = this.canvasNode.clientHeight
    this.width = this.canvasNode.width = this.canvasNode.clientWidth

    this.innerHeight = this.height - this.config.margin.top - this.config.margin.bottom
    this.innerWidth = this.width - this.config.margin.right - this.config.margin.left

    this.matrix.calculateUnitDimensions()

    // Reset timeout, so a new resize can be requested again
    this.resizeTimeout = false
  }

  @autobind
  forceDraw () {
    this.lastFrameTime = 0
    this.handleDraw()
  }

  @autobind
  handleDraw () {
    // Request next frame
    window.requestAnimationFrame(this.handleDraw)

    let currentTime = (new Date()).getTime()
    // Check if we draw new frame (adjust framerate)
    if (currentTime - this.lastFrameTime < 1000 / this.fps) {
      return
    }

    // Used to determine how much to animate to stay smooth (movement * timeCoeff) -> (movement per second)
    let timeCoeff = (currentTime - this.lastFrameTime) / 1000
    // On first draw set timeCoeff low, so it doesn't jump right away
    if (this.lastFrameTime === 0) {
      timeCoeff = 0.001
    }

    // Used to determine time last frame was drawn
    this.lastFrameTime = currentTime

    // Periodically resize, as some resizings arent catched with the resize handler
    if (currentTime - this.lastResize > 100) {
      this.lastResize = currentTime
      this.resize()
    }

    // Actual draw
    this.fpsCounter.count(currentTime)
    this.draw.draw(timeCoeff)
  }
}

export default Chart
