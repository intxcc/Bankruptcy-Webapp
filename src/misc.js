'use strict'

export function isFullscreen () {
  let doc = window.document
  return typeof (doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) === 'object'
}

export function canFullscreen () {
  let doc = window.document

  return doc.fullscreenEnabled || doc.mozFullScreenEnabled || doc.webkitFullscreenEnabled || doc.msFullscreenEnabled
}

export function toggleFullscreen () {
  var doc = window.document
  var docEl = doc.documentElement

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

  if (!isFullscreen()) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}

export function isRunningStandalone () {
  return window.matchMedia('(display-mode: standalone)').matches
}
