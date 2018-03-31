'use strict'

export function line (ctx, fromX, fromY, toX, toY) {
  fromX += 0.5
  fromY += 0.5
  // if (fromX === toX) {
  //   fromX = Math.round(fromX) + 0.5
  //   toX = Math.round(toX) + 0.5
  // }

  // if (fromY === toY) {
  //   if (Math.round(fromY) === fromY) {
  //     fromY = Math.round(fromY) + 0.5
  //     toY = Math.round(toY) + 0.5
  //   }
  // }

  ctx.beginPath()
  ctx.moveTo(fromX, fromY)
  ctx.lineTo(toX, toY)
  ctx.stroke()
}

export function text (ctx, text, x, y, options) {
  const defaultOptions = {
    fontFamily: 'Roboto ',
    size: '10px'
  }

  options = Object.assign({}, defaultOptions, options)

  ctx.font = options.size + ' ' + options.fontFamily
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)
}
