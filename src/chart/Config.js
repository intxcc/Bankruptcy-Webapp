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

  maxZoomScale: 0.11,

  showClippedPoint: true,
  showFreeCrosshair: true,

  crosshairColor: '#777',
  pointColor: 'rgba(0, 0, 0, 0.5)',
  pointFilled: false,
  pointSize: 3,
  pointLineWidth: 1,

  axisColor: '#333',
  plotColor: '#222',

  grid: {
    lineWidth: 1.1,
    subLineWidth: 0.8,
    strokeStyle: '#888'
  }
}

export default Config
