'use strict'

import autoBind from 'auto-bind'

/* eslint-env worker */

class ChartWorker {
  constructor () {
    autoBind(this)

    self.addEventListener('message', this.handleMessage)
  }

  handleMessage (e) {
    console.log(e.data)
    postMessage('test')
  }
}

// eslint-disable-next-line
new ChartWorker()
