'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import BigMenu from './dashboard/bigmenu'

const Dashboard = (props) => (
  <div id="dashboard_wrapper">
    <BigMenu
      store={props.store} />
  </div>
)

Dashboard.propTypes = {
  store: PropTypes.object,
  dashboardBigMenuClosed: PropTypes.bool
}

export default Dashboard
