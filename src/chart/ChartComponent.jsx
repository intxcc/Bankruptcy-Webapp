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
      canvasNode: this.canvasNode,
      onSelectedPointChanged: this.props.onSelectedPointChanged
    })

    window.addEventListener('resize', this.chart.handleResize)
  }

  @autobind
  componentWillUnmount () {
    window.removeEventListener('resize', this.chart.handleResize)
  }

  @autobind
  handleMouseLeave (e) {
    this.chart.crosshair.clear()
  }

  @autobind
  handleDoubleClick (e) {
    this.chart.handleDoubleClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  @autobind
  handleMouseDown (e) {
    this.chart.selection.startDrag(e.nativeEvent.offsetX, e.nativeEvent.offsetY)

    if (this.props.changeOnDragged) {
      this.props.changeOnDragged(true)
    }

    this.drag = true
  }

  @autobind
  handleMouseUp (e) {
    this.chart.selection.stopDrag()

    if (this.props.changeOnDragged) {
      this.props.changeOnDragged(false)
    }

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
        onMouseLeave={this.handleMouseLeave}
        onDoubleClick={this.handleDoubleClick}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp} />
    )
  }
}

ChartComponent.propTypes = {
  id: PropTypes.string,
  changeOnDragged: PropTypes.func,
  onSelectedPointChanged: PropTypes.func
}

export default ChartComponent
