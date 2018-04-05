'use strict'

export function line (ctx, fromX, fromY, toX, toY) {
  // fromX += 0.5
  // fromY += 0.5
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

export function lineNoSingle (ctx, fromX, fromY, toX, toY) {
  // fromX += 0.5
  // fromY += 0.5

  ctx.moveTo(fromX, fromY)
  ctx.lineTo(toX, toY)
}

export function text (ctx, text, x, y, options) {
  const defaultOptions = {
    fontFamily: 'Roboto ',
    size: '10px',
    align: 'center',
    valign: 'middle'
  }

  options = Object.assign({}, defaultOptions, options)

  ctx.font = options.size + ' ' + options.fontFamily
  ctx.textAlign = options.align
  ctx.textBaseline = options.valign
  ctx.fillText(text, x, y)
}

export function point (ctx, x, y, r, s = false) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)

  if (s) {
    ctx.stroke()
  } else {
    ctx.fill()
  }
}
