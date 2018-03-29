'use strict'

// Needs fontawesome

import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  let symbol = ''

  if (props.symbol) {
    symbol = (
      <i className={'r-input-symbol fas fa-' + props.symbol}></i>
    )
  }

  return (
    <div {...props} className="r-input">
      <input
        name={props.name}
        placeholder={props.placeholder}
        className="r-input-text"
        type="text" />
      {symbol}
    </div>
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  symbol: PropTypes.string,
  name: PropTypes.string
}

export default Input
