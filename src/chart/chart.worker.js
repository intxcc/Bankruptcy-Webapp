'use strict'

/* eslint-env worker */

// eslint-disable-next-line
var onmessage = function (e) {
  console.log('Message received from main script')
  var workerResult = 'Result: ' + (e.data[0] * e.data[1])
  console.log('Posting message back to main script')
  postMessage(workerResult)
}
