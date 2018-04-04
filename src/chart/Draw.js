'use strict'

import autobind from 'autobind-decorator'

class Draw {
  constructor (chart) {
    this.chart = chart
  }

  @autobind
  draw (timeCoeff) {
    let chart = this.chart

    // Clear rect to allow redrawing
    chart.ctx.clearRect(0, 0, chart.width, chart.height)

    // Create new axis object if neccessary and draw
    chart.axis.bottomAxis()
    chart.axis.leftAxis()

    // Create new plot object if neccessary and draw
    chart.plot.path(chart.data)

    // Create new Crosshair object if neccessary and draw
    chart.crosshair.drawSelection()
  }
}

export default Draw
