'use strict'

import React from 'react'

const Exchange = (props) => (
  <div id="exchange_wrapper">
    <div id="exchange-search-input-wrapper">
      <span id="exchange-search-input-label">
        Search
      </span>
      <div id="exchange-search-input">
        <input placeholder="e.g. Ethereum" id="exchange-search-input-text" type="text" />
        <i id="exchange-search-input-button" className="fas fa-search"></i>
      </div>
    </div>
  </div>
)

export default Exchange
