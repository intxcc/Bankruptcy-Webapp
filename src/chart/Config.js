import StyleVariables from '../../style/variables.scss'

let Config = {
  FPSperiod: 10 * 1000, // 10 seconds
  defaultFPS: 10,
  showFPS: true,

  axisMargin: 30,
  axisPadding: 4,
  margin: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  },

  fixedSelection: {
    // bottom: 0
  },

  selectionBoundaries: {
    left: 0,
    bottom: 0
  },

  maxZoomScale: 0.11,

  showClippedPoint: true,
  showFreeCrosshair: true,

  crosshairVerticalColor: StyleVariables.gridCrosshairColor,
  crosshairHorizontalColor: StyleVariables.gridColor,
  pointColor: StyleVariables.gridCrosshairColor,
  pointFilled: false,
  pointSize: 3,
  pointLineWidth: 1,

  axisColor: StyleVariables.axisColor,
  plotColor: StyleVariables.plotColor,

  grid: {
    lineWidth: 1.1,
    subLineWidth: 0.8,
    strokeStyle: StyleVariables.gridColor
  }
}

export default Config
