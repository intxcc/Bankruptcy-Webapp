'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import autobind from 'autobind-decorator'

import Chart from './Chart'

class ChartComponent extends Component {
  @autobind
  componentDidMount () {
    this.ctx = this.canvasNode.getContext('2d')

    this.chart = new Chart({
      ctx: this.ctx,
      canvasNode: this.canvasNode
    })

    window.addEventListener('resize', this.chart.handleResize)
  }

  @autobind
  componentWillUnmount () {
    window.removeEventListener('resize', this.chart.handleResize)
  }

  @autobind
  handleMouseDown (e) {
    this.chart.selection.startDrag(e.nativeEvent.offsetX, e.nativeEvent.offsetY)

    this.drag = true
  }

  @autobind
  handleMouseUp (e) {
    this.chart.selection.stopDrag()

    this.drag = false
  }

  @autobind
  handleMouseMove (e) {
    this.chart.selection.drag(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    this.chart.handleMouseMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  @autobind
  handleScrollWheel (e) {
    let delta = e.deltaY * (e.deltaMode === 1 ? 1 : 0.03)
    this.chart.selection.zoom(delta, e.nativeEvent.offsetX, e.nativeEvent.offsetY)

    e.preventDefault()
    return false
  }

  @autobind
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
