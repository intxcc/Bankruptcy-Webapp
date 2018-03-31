'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

@observer
class Chart extends Component {
  constructor (props) {
    super(props)

    this.initialize = this.initialize.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.resize = this.resize.bind(this)
    this.forceDraw = this.forceDraw.bind(this)
    this.handleDraw = this.handleDraw.bind(this)
    this.fpsCounter = this.fpsCounter.bind(this)
    this.draw = this.draw.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)

    this.ctx = this.canvasNode.getContext('2d')

    this.initialize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  initialize () {
    // Set parameters
    this.fps = 60

    // Initialize variables
    this.config = {
      FPSperiod: 10000,
      showFPS: true
    }

    this.fpsLastCheck = 0
    this.fpsFrameCount = 0

    this.lastFrameTime = 0

    // Initialize size
    this.resize()

    // Nudge drawing
    this.handleDraw()
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
    if (currentTime - this.lastResize > 200) {
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

    this.ctx.fillStyle = 'black'
    this.ctx.font = '30px Arial'
    this.ctx.fillText('Hello World', 10, 50)
  }

  render () {
    return (
      <canvas id={this.props.id} ref={(canvasNode) => { this.canvasNode = canvasNode }} />
    )
  }
}

Chart.propTypes = {
  id: PropTypes.string
}

export default Chart
