'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const BigMenuButton = (props) => (
  <li>
    <div className="big-menu-btn-background">
      <i className={'fas fa-' + props.symbol}></i>
    </div>
    <div className="big-menu-btn-overlay">
      <span className="big-menu-overlay-symbol">
        <i className={'fas fa-' + props.symbol}></i>
      </span>
      <span className="big-menu-overlay-name">{props.name}</span>
    </div>
  </li>
)

BigMenuButton.propTypes = {
  name: PropTypes.string,
  symbol: PropTypes.string
}

const Home = (props) => (
  <div id="home_wrapper">
    <ul id="home_big_menu">
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

export default Home
