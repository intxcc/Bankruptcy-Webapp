'use strict'

import autoBind from 'auto-bind'

import Axis from './axis'
import Plot from './plot'
import Selection from './selection'

class Chart {
  constructor (props) {
    this.ctx = props.ctx
    this.canvasNode = props.canvasNode

    autoBind(this)

    this.intialize()
  }

  intialize () {
    // Set parameters
    this.defaultFps = 10
    this.fps = this.defaultFps

    // Initialize variables
    this.config = {
      FPSperiod: 10 * 1000, // 10 seconds
      showFPS: true,

      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },

      fixedSelection: {
        // bottom: 0
      },

      axisMargin: 20,
      axisColor: '#555',
      plotColor: '#222'
    }

    this.selection = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }

    this.fpsLastCheck = 0
    this.fpsFrameCount = 0

    this.lastFrameTime = 0

    // Initialize chart
    // this.setDomain()
    // this.setSelection(0, this.data.length - 1) // TODO uncomment again

    // TEST STUFF //

    // this.data = [
    //   5, 10, 35, 17, 19
    // ]

    this.data = [0]
    for (let i = 1; i < 500; i++) {
      this.data.push(this.data[i - 1] + (Math.random() * 5) - 2.5)
    }

    this.setDomain()
    this.setSelection({
      top: 30,
      right: 30,
      bottom: 0,
      left: 0
    })

    // END TEST STUFF //

    // Initialize size
    this.resize()

    // Nudge drawing
    this.handleDraw()
  }

  setDomain () {
    this.min = Math.min(this.data)
    this.max = Math.max(this.data)
  }

  setSelection (selection) {
    this.selection = Object.assign({}, this.selection, selection, this.config.fixedSelection)

    this.calculateUnitDimensions()
  }

  startDrag (x, y) {
    this.dragActive = true

    this.dragSelection = {}
    this.dragStart = {
      x: x,
      y: y
    }
    Object.assign(this.dragSelection, this.selection)
  }

  stopDrag () {
    this.dragActive = false
  }

  drag (x, y) {
    if (!this.dragActive) {
      return
    }

    let dragXPixel = this.dragStart.x - x
    let dragYPixel = this.dragStart.y - y

    let deltaX = dragXPixel / this.unitWidth
    let deltaY = dragYPixel / this.unitHeight

    this.setSelection({
      top: this.dragSelection.top - deltaY,
      right: this.dragSelection.right + deltaX,
      bottom: this.dragSelection.bottom - deltaY,
      left: this.dragSelection.left + deltaX
    })
  }

  handleMouseMove (x, y) {
    if (!this.sel) {
      this.sel = new Selection(this)
    }

    let point = this.mapPixelToCoordinate(x, y)
    this.sel.selectX(point.x)
  }

  zoom (delta) {
    let deltaCoeff = (this.selection.top - this.selection.bottom) + (this.selection.right - this.selection.left)
    delta = delta * 0.01 * Math.pow(deltaCoeff * 0.15, 1.05)

    this.setSelection({
      top: this.selection.top + delta,
      right: this.selection.right + delta,
      bottom: this.selection.bottom - delta,
      left: this.selection.left - delta
    })
  }

  calculateUnitDimensions () {
    this.unitWidth = this.innerWidth / (this.selection.right - this.selection.left)
    this.unitHeight = this.innerHeight / (this.selection.top - this.selection.bottom)
  }

  mapPixelToCoordinate (x, y) {
    let result = {
      x: 0,
      y: 0
    }

    result.x = ((x - this.config.margin.left - this.config.axisMargin) / this.unitWidth) + this.selection.left
    result.y = ((this.config.margin.top + this.innerHeight - this.config.axisMargin - y) / this.unitHeight) + this.selection.bottom

    return result
  }

  mapCoordinateToPixel (x, y) {
    let result = {
      x: 0,
      y: 0
    }

    result.x = this.config.margin.left + this.config.axisMargin + (x - this.selection.left) * this.unitWidth
    result.y = (this.config.margin.top + this.innerHeight - this.config.axisMargin) - (y - this.selection.bottom) * this.unitHeight

    return result
  }

  handleResize () {
    // Use this to throttle resizing
    if (!this.resizeTimeout) {
      this.resizeTimeout = setTimeout(this.resize, 100)

      // Force draw to enhance perceived responsiveness and prevent flickering
      this.resizeTimeout = setTimeout(this.forceDraw, 100)
    }
  }

  resize () {
    this.lastResize = (new Date()).getTime()

    // Adjust height and width to actual pixel size
    this.height = this.canvasNode.height = this.canvasNode.clientHeight
    this.width = this.canvasNode.width = this.canvasNode.clientWidth

    this.innerHeight = this.height - this.config.margin.top - this.config.margin.bottom
    this.innerWidth = this.width - this.config.margin.right - this.config.margin.left

    this.calculateUnitDimensions()

    // Reset timeout, so a new resize can be requested again
    this.resizeTimeout = false
  }

  forceDraw () {
    this.lastFrameTime = 0
    this.handleDraw()
  }

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
    this.fpsCounter(currentTime)
    this.draw(timeCoeff)
  }

  fpsCounter (currentTime) {
    this.fpsFrameCount++

    // If this is the first check initialize and return
    if (this.fpsLastCheck === 0) {
      this.fpsLastCheck = currentTime
      return
    }

    // Calculate the fps from the framecount in the time passed since the last FPS calculation
    if (currentTime - this.fpsLastCheck >= this.config.FPSperiod) {
      // Normalize framecount and passed time to frames per second
      let fps = this.fpsFrameCount / ((currentTime - this.fpsLastCheck) / 1000)

      // Log FPS if enables
      if (this.config.showFPS) {
        console.log('FPS: ' + Math.round(fps) + 'frames/second')
      }

      // Reset fpsCounter
      this.fpsLastCheck = currentTime
      this.fpsFrameCount = 0
    }
  }

  draw (timeCoeff) {
    // Clear rect to allow redrawing
    this.ctx.clearRect(0, 0, this.width, this.height)

    // Create new axis element
    if (!this.axis) {
      this.axis = new Axis(this)
    }

    // this.setSelection({
    //   left: this.selection.left + timeCoeff * 0.1,
    //   right: this.selection.right + timeCoeff * 0.1
    // })

    this.axis.bottomAxis()
    this.axis.leftAxis()

    if (!this.plot) {
      this.plot = new Plot(this)
    }

    this.plot.path(this.data)

    if (!this.sel) {
      this.sel = new Selection(this)
    }

    this.sel.drawSelection()
  }
}

export default Chart
