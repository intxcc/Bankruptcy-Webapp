'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

// import StyleVariables from '../style/variables.scss'

import MainSideMenu from './main/MainSideMenu'

import Dashboard from './Dashboard'
import Exchange from './Exchange'

@observer
class Main extends Component {
  constructor (props) {
    super(props)

    this.handleBodyScroll = this.handleBodyScroll.bind(this)
    this.handleToggleSideMenuClick = this.handleToggleSideMenuClick.bind(this)
    this.handlePinSideMenuClick = this.handlePinSideMenuClick.bind(this)
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleBodyScroll)

    this.mainHeader.scrollTop = this.props.store.mainScrollTopSaved
    this.props.store.mainHeaderLogoHeight = this.mainHeaderLogo.clientHeight

    // TODO: Animate this!
    // setTimeout(() => { document.documentElement.scrollTop = 0 }, parseInt(StyleVariables.routeTransitionTime) + 50)
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleBodyScroll)

    this.props.store.mainScrollTopSaved = this.mainHeader.scrollTop
  }

  handleBodyScroll (e) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    this.props.store.mainHeaderCollapsed = (this.mainHeader.clientHeight - this.props.store.mainHeaderLogoHeight) - scrollTop <= 0

    if (!this.props.store.mainShowSideMenuTouched) {
      this.props.store.mainShowSideMenu = this.props.store.mainHeaderCollapsed
    }
  }

  handleToggleSideMenuClick (e) {
    // Remember that user has touched the menu toggle and don't automatically adjust anymore
    this.props.store.mainShowSideMenuTouched = true

    this.props.store.mainShowSideMenu = !this.props.store.mainShowSideMenu

    if (!this.props.store.mainShowSideMenu) {
      this.props.store.mainPinSideMenu = false
    } else {
      this.props.store.mainPinSideMenu = this.props.store.mainSideMenuWasPinned
    }
  }

  handlePinSideMenuClick (e) {
    // Remember that user has touched the menu toggle and don't automatically adjust anymore
    this.props.store.mainShowSideMenuTouched = true

    this.props.store.mainPinSideMenu = !this.props.store.mainPinSideMenu

    this.props.store.mainSideMenuWasPinned = this.props.store.mainPinSideMenu
  }

  render () {
    let headerClassName = ''

    if (this.props.store.mainHeaderCollapsed) {
      headerClassName += 'collapse-main-header '
    }

    if (this.props.store.mainShowSideMenu) {
      headerClassName += 'open-main-side-menu '
    }

    if (this.props.store.mainPinSideMenu) {
      headerClassName += 'pin-main-side-menu '
    }

    return (
      <div className={headerClassName} id="main_wrapper">
        <a id="top" name="top"></a>
        <header id="main_header" ref={mainHeader => { this.mainHeader = mainHeader }}>
          <HashLink smooth id="main_logo_wrapper_link" to="/dashboard/">
            <div id="main_logo_wrapper" ref={mainHeaderLogo => { this.mainHeaderLogo = mainHeaderLogo }}>
              <div id="main_logo_logo">
                B<span>ankruptcy</span>!
              </div>
              <div id="main_logo_caption">
                No, really. You are a good daytrader.
              </div>
            </div>
          </HashLink>
        </header>
        <div id="permanent_header_wrapper_background">
        </div>
        <div id="permanent_header_wrapper">
          <HashLink smooth to="/dashboard/">
            <div id="permanent_logo">
              B<span>ankruptcy</span>!
            </div>
          </HashLink>
        </div>
        <MainSideMenu
          handleToggleSideMenuClick={this.handleToggleSideMenuClick}
          handlePinSideMenuClick={this.handlePinSideMenuClick} />
        <main id="main_content">
          <Route
            path="/dashboard"
            render={routeProps => <Dashboard {...Object.assign({}, routeProps, {
              store: this.props.store
            })} />} />
          <Route
            path="/exchange"
            render={routeProps => <Exchange {...Object.assign({}, routeProps, {
              store: this.props.store
            })} />} />
        </main>
      </div>
    )
  }
}

Main.propTypes = {
  store: PropTypes.object
}

export default Main
