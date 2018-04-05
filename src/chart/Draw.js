'use strict'

import autobind from 'autobind-decorator'

class Draw {
  constructor (chart) {
    this.chart = chart

    // Set parameters
    this.fps = this.chart.config.defaultFPS

    // Initialize variables
    this.lastFrameTime = 0
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
    if (currentTime - this.chart.lastResize > 100) {
      this.chart.lastResize = currentTime
      this.chart.resize()
    }

    // Actual draw
    this.chart.fpsCounter.count(currentTime)
    this.draw(timeCoeff)
  }

  @autobind
  draw (timeCoeff) {
    let chart = this.chart

    // Recalculate some important variables for drawing
    chart.matrix.calculateMappingCoeffs()

    // Clear rect to allow redrawing
    chart.ctx.clearRect(0, 0, chart.width, chart.height)

    // Draw grid
    chart.grid.drawGrid()

    // Draw graph
    chart.plot.path(chart.data)

    // Draw axis
    chart.axis.bottomAxis()
    chart.axis.leftAxis()

    // Create new Crosshair object if neccessary and draw
    chart.crosshair.drawCrosshair()
  }
}

export default Draw
