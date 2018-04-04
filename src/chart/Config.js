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

  clipCrosshairToPath: true,

  axisColor: '#555',
  plotColor: '#222'
}

export default Config
