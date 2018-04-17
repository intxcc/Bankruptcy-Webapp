'use strict'

import autobind from 'autobind-decorator'

// Members each data item has
const dataMembers = [
  'close',
  'date',
  'hight',
  'low',
  'open',
  'quoteVolume',
  'volume',
  'weightedAverage'
]

class Data {
  constructor (chart) {
    this.chart = chart

    this.setData(false)
  }

  @autobind
  initializeEmptyData () {
    this.data = {}
    for (let member of dataMembers) {
      this.data[member] = []
    }
  }

  @autobind
  setData (data) {
    // If no data given initialize still an empty object to prevent bugs
    this.initializeEmptyData()

    if (!data) {
      return
    }

    let availableDataMembers = []
    for (let member of dataMembers) {
      if (data[0][member]) {
        availableDataMembers.push(member)
      }
    }

    for (let dataPoint of data) {
      for (let member of availableDataMembers) {
        this.data[member].push(dataPoint[member])
      }
    }
  }
}

export default Data
