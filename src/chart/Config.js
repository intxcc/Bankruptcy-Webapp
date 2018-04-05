let Config = {
  FPSperiod: 10 * 1000, // 10 seconds
  defaultFPS: 60,
  showFPS: true,

  axisMargin: 30,
  margin: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  },

  defaultSelection: {
    top: 10,
    right: 10,
    bottom: 0,
    left: 0
  },

  fixedSelection: {
    // bottom: 0
  },

  selectionBoundaries: {
    left: 0,
    bottom: 0
  },

  showClippedPoint: true,
  showFreeCrosshair: true,

  pointColor: 'rgba(0, 0, 0, 0.5)',
  pointFilled: false,
  pointSize: 3,
  pointLineWidth: 1,

  axisColor: '#555',
  plotColor: '#222',

  grid: {
    lineWidth: 1,
    strokeStyle: 'rgba(255, 255, 255, 0.5)'
    // subLineWidth: 1,
    // subStrokeStyle: 'rgba(255, 255, 255, 0.2)'
  }
}

export default Config
