'use strict'

import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

@observer
class Chart extends Component {
  render () {
    return (
      <canvas />
    )
  }
}

// Chart.propTypes = {
//   store: PropTypes.object
// }

export default Chart
