import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

const MainSideMenuLink = (props) => (
  <NavLink activeClassName="main-side-menu-li-active" to={props.to}>
    <li>
      <div className="main-side-menu-li-inner">{props.name}</div>
      <div className="main-side-menu-li-symbol">
        <i className={'fas fa-' + props.symbol}></i>
      </div>
    </li>
  </NavLink>
)

MainSideMenuLink.propTypes = {
  symbol: PropTypes.string,
  name: PropTypes.string,
  to: PropTypes.string
}

const MainSideMenu = (props) => (
  <div>
    <div id="main-side-menu-toggle-button" onClick={props.handleToggleSideMenuClick}><i className="fas fa-bars"></i></div>
    <div id="main-side-menu-pin-button" onClick={props.handlePinSideMenuClick}><i className="fas fa-expand-arrows-alt"></i></div>
    <div id="main-side-menu-background">
    </div>
    <nav id="main-side-menu">
      <ul>
        <MainSideMenuLink name="Dashboard" symbol="home" to="/dashboard/" />
        <MainSideMenuLink name="Exchange" symbol="chart-line" to="/exchange/" />
        <MainSideMenuLink name="Social" symbol="bullhorn" to="/social/" />
        <MainSideMenuLink name="Leaderboard" symbol="sort-amount-up" to="/leaderboard/" />
        <MainSideMenuLink name="Groups" symbol="users" to="/groups/" />
        <MainSideMenuLink name="Profile" symbol="user" to="/profile/" />
      </ul>
    </nav>
  </div>
)

MainSideMenu.propTypes = {
  handleToggleSideMenuClick: PropTypes.func,
  handlePinSideMenuClick: PropTypes.func
}

export default MainSideMenu
