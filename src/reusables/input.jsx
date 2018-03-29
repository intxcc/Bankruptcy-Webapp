'use strict'

// Needs fontawesome

import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  const { onclicksymbol, ...otherProps } = props

  let symbol = ''
  if (props.symbol) {
    symbol = (
      <i onClick={onclicksymbol} className={'r-input-symbol fas fa-' + props.symbol}></i>
    )
  }

  return (
    <div className="r-input">
      <input {...otherProps}
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
  name: PropTypes.string,
  onclicksymbol: PropTypes.func
}

export default Input
