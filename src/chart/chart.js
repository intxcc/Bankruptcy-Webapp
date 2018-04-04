'use strict'

import autoBind from 'auto-bind'

import Config from './Config'

import Axis from './Axis'
import Plot from './Plot'
import Crosshair from './Crosshair'

class Chart {
  constructor (props) {
    this.ctx = props.ctx
    this.canvasNode = props.canvasNode

    autoBind(this)

    this.intialize()
  }

  intialize () {
    // Initialize config
    this.config = Config

    // Set parameters
    this.fps = this.config.defaultFPS

    this.selection = this.config.defaultSelection

    // Initialize Variables
    this.fpsLastCheck = 0
    this.fpsFrameCount = 0

    this.lastFrameTime = 0

    // Initialize chart
    // this.setDomain()
    // this.setSelection(0, this.data.length - 1) // TODO uncomment again

    // TEST STUFF //

    this.data = [5]
    for (let i = 1; i < 2000; i++) {
      this.data.push(this.data[i - 1] + (Math.random() * 0.5) - 0.25)
    }

    this.setDomain()

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

    if (this.selection.top > this.config.selectionBoundaries.top) {
      this.selection.top = this.config.selectionBoundaries.top
    }

    if (this.selection.right > this.config.selectionBoundaries.right) {
      this.selection.right = this.config.selectionBoundaries.right
    }

    if (this.selection.bottom < this.config.selectionBoundaries.bottom) {
      this.selection.bottom = this.config.selectionBoundaries.bottom
    }

    if (this.selection.left < this.config.selectionBoundaries.left) {
      this.selection.left = this.config.selectionBoundaries.left
    }

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

    // If drag is active calculate the dragged distance since dragStart
    let dragXPixel = this.dragStart.x - x
    let dragYPixel = this.dragStart.y - y

    // Convert distance to coordinated as these are the unit of the selection
    let deltaX = dragXPixel / this.unitWidth
    let deltaY = dragYPixel / this.unitHeight

    // Convert the coorinate delta between the new calculated selection and the current active
    deltaX = (this.dragSelection.left + deltaX) - this.selection.left
    deltaY = this.selection.bottom - (this.dragSelection.bottom - deltaY)

    // Apply delta while keeping selection ratio
    this.moveSelectionKeepRatio(deltaX, deltaY)
  }

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

  handleMouseMove (x, y) {
    this.mousePos = {
      x: x,
      y: y
    }

    if (!this.crosshair) {
      this.crosshair = new Crosshair(this)
    }

    this.crosshair.setPosition(x, y)
  }

  posDelta (pos1, pos2) {
    return {
      x: pos2.x - pos1.x,
      y: pos2.y - pos1.y
    }
  }

  /**
  * Zooms into or out of the graph
  * @param {float} delta The delta gives the amount of zoom that will be applied. Direction is given by sign. Usually this will be -3 or 3.
  * @param {integer} x X position of mouse within canvas.
  * @param {integer} y Y position of mouse within canvas.
  */
  zoom (delta, x, y) {
    // The deltaCoeff is used to calculate the amount of zoom
    let deltaCoeffX = this.selection.right - this.selection.left
    let deltaCoeffY = this.selection.top - this.selection.bottom

    // Calculate delta with exponential function, so it gets slower the closer the zoom is to the path
    let deltaX = delta * 0.03 * Math.pow(deltaCoeffX * 0.15, 1.1)
    let deltaY = delta * 0.03 * Math.pow(deltaCoeffY * 0.15, 1.1)

    // Used to calculate the right celection position later, to move it again under the mouse cursor
    let posBefore = this.mapPixelToCoordinate(x, y)

    this.setSelection({
      top: this.selection.top + deltaY,
      right: this.selection.right + deltaX,
      bottom: this.selection.bottom - deltaY,
      left: this.selection.left - deltaX
    })

    // Calculate where the position the cursor was hovering before zooming is now on the canvas
    let posAfter = this.mapCoordinateToPixel(posBefore.x, posBefore.y)

    // Calculate pixel difference between the old coordinate on the canvas and mouse position
    let posDelta = this.posDelta({x: x, y: y}, posAfter)

    // Convert pixel difference to coordinate difference and adjust selection
    let pixelDelta = {
      x: posDelta.x / this.unitWidth,
      y: posDelta.y / this.unitHeight
    }
    this.moveSelectionKeepRatio(pixelDelta.x, pixelDelta.y)

    // Reselect because otherwise the selection won't adjust to the new zoom without moving the mouse
    this.handleMouseMove(this.mousePos.x, this.mousePos.y)
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

    // Create new axis object if neccessary and draw
    if (!this.axis) {
      this.axis = new Axis(this)
    }
    this.axis.bottomAxis()
    this.axis.leftAxis()

    // Create new plot object if neccessary and draw
    if (!this.plot) {
      this.plot = new Plot(this)
    }
    this.plot.path(this.data)

    // Create new Crosshair object if neccessary and draw
    if (!this.crosshair) {
      this.crosshair = new Crosshair(this)
      this.crosshair.setOptions({
        clipSelectionToPath: this.config.clipSelectionToPath
      })
    }
    this.crosshair.drawSelection()
  }
}

export default Chart
