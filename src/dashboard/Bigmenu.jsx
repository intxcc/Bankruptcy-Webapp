'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import { Link } from 'react-router-dom'

const BigMenuButton = (props) => (
  <Link to={props.url}>
    <li>
      <span className="big-menu-symbol">
        <i className={'fas fa-' + props.symbol}></i>
      </span>
      <span className="big-menu-name">{props.name}</span>
    </li>
  </Link>
)

BigMenuButton.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  symbol: PropTypes.string
}

@observer class BigMenu extends React.Component {
  constructor (props) {
    super(props)

    this.buttons = [
      {
        id: 0,
        url: '/exchange/',
        name: 'Exchange',
        symbol: 'chart-line'
      }, {
        id: 1,
        url: '/social/',
        name: 'Social',
        symbol: 'bullhorn'
      }, {
        id: 2,
        url: '/leaderboard/',
        name: 'Leaderboard',
        symbol: 'sort-amount-up'
      }, {
        id: 3,
        url: '/groups/',
        name: 'Groups',
        symbol: 'users'
      }, {
        id: 4,
        url: '/profile/',
        name: 'Profile',
        symbol: 'user'
      }
    ]
  }

  render () {
    return (
      <ul id="dashboard_big_menu" className={this.props.store.dashboardBigMenuClosed ? 'closed' : ''}>
        <div id="dashboard_big_menu_close_button" onClick={() => { this.props.store.closeBigMenu(this.props.store) }}>
          <span>+</span>
        </div>
        {this.buttons.map(button => <BigMenuButton key={button.id} url={button.url} name={button.name} symbol={button.symbol} />)}
      </ul>
    )
  }
}

BigMenu.propTypes = {
  store: PropTypes.object
}

export default BigMenu
