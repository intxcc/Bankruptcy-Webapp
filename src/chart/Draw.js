'use strict'

import autobind from 'autobind-decorator'

class Draw {
  constructor (chart) {
    this.chart = chart
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
