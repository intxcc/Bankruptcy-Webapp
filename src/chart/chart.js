'use strict'

import autoBind from 'auto-bind'

import Axis from './axis'

class Chart {
  constructor (props) {
    this.ctx = props.ctx
    this.canvasNode = props.canvasNode

    autoBind(this)

    this.intialize()
  }

  intialize () {
    // Set parameters
    this.fps = 60

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

      axisMargin: 20,
      axisColor: '#444'
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

    this.data = [
      5, 10, 50, 89
    ]

    this.setDomain()
    this.setSelection({
      top: 100,
      right: 1.5,
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
    this.selection = Object.assign({}, this.selection, selection)

    this.calculateUnitWidth()
  }

  calculateUnitWidth () {
    this.unitWidth = this.innerWidth / (this.selection.right - this.selection.left)
  }

  mapPixelToCoordinate (x, y) {
    let result = {
      x: 0,
      y: 0
    }

    result.x = ((x - this.config.margin.left) / this.unitWidth) + this.selection.left

    return result
  }

  mapCoordinateToPixel (x, y) {
    let result = {
      x: 0,
      y: 0
    }

    result.x = this.config.margin.left + (x - this.selection.left) * this.unitWidth
    result.y = this.config.margin.top + this.innerHeight + y

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

    this.calculateUnitWidth()

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

    // Used to determine time last frame was drawn
    this.lastFrameTime = (new Date()).getTime()

    // Periodically resize, as some resizings arent catched with the resize handler
    if (currentTime - this.lastResize > 100) {
      this.lastResize = currentTime
      this.resize()
    }

    // Actual draw
    this.fpsCounter(currentTime)
    this.draw()
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

  draw () {
    // Clear rect to allow redrawing
    this.ctx.clearRect(0, 0, this.width, this.height)

    // Create new axis element
    if (!this.axis) {
      this.axis = new Axis(this)
    }

    this.setSelection({
      left: this.selection.left + 0.001,
      right: this.selection.right + 0.001
    })

    this.axis.bottomAxis()
  }
}

export default Chart
