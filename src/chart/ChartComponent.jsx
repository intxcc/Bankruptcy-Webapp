'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import autoBind from 'auto-bind'

import Chart from './chart'

class ChartComponent extends Component {
  constructor (props) {
    super(props)

    autoBind(this)
  }

  componentDidMount () {
    this.ctx = this.canvasNode.getContext('2d')

    this.chart = new Chart({
      ctx: this.ctx,
      canvasNode: this.canvasNode
    })

    window.addEventListener('resize', this.chart.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.chart.handleResize)
  }

  handleMouseDown (e) {
    this.chart.startDrag(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    this.chart.fps = 60

    this.drag = true
  }

  handleMouseUp (e) {
    this.chart.stopDrag()
    this.chart.fps = this.chart.defaultFps

    this.drag = false
  }

  handleMouseMove (e) {
    this.chart.drag(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    this.chart.handleMouseMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)

    // let { x, y } = this.chart.mapPixelToCoordinate(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    // console.log(x + ' : ' + y)
  }

  handleScrollWheel (e) {
    this.chart.zoom(e.deltaY)
    e.preventDefault()

    return false
  }

  render () {
    return (
      <canvas
        id={this.props.id}
        style={{height: '100%', width: '100%'}}
        ref={(canvasNode) => { this.canvasNode = canvasNode }}
        onWheel={this.handleScrollWheel}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp} />
    )
  }
}

ChartComponent.propTypes = {
  id: PropTypes.string
}

export default ChartComponent
