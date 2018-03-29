'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const BigMenuButton = (props) => (
  <li>
    <span className="big-menu-symbol">
      <i className={'fas fa-' + props.symbol}></i>
    </span>
    <span className="big-menu-name">{props.name}</span>
  </li>
)

BigMenuButton.propTypes = {
  name: PropTypes.string,
  symbol: PropTypes.string
}

const Dashboard = (props) => (
  <div id="dashboard_wrapper">
    <ul id="dashboard_big_menu" className={props.dashboardBigMenuClosed ? 'closed' : ''}>
      <div id="dashboard_big_menu_close_button" onClick={() => { props.store.closeBigMenu(props.store) }}>
        <i className="fas fa-times"></i>
      </div>
      <Link to="/exchange/">
        <BigMenuButton name="Exchange" symbol="chart-line" />
      </Link>
      <BigMenuButton name="Social" symbol="bullhorn" />
      <BigMenuButton name="Leaderboard" symbol="sort-amount-up" />
      <BigMenuButton name="Groups" symbol="users" />
      <BigMenuButton name="Profile" symbol="user" />
    </ul>
  </div>
)

Dashboard.propTypes = {
  store: PropTypes.object,
  dashboardBigMenuClosed: PropTypes.bool
}

export default Dashboard
