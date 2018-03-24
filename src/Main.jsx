'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

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
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleBodyScroll)

    this.props.store.mainScrollTopSaved = this.mainHeader.scrollTop
  }

  handleBodyScroll (e) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    this.props.store.mainHeaderCollapsed = (this.mainHeader.clientHeight - this.props.store.mainHeaderLogoHeight) - scrollTop <= 0
  }

  handleToggleSideMenuClick (e) {
    this.props.store.mainShowSideMenu = !this.props.store.mainShowSideMenu

    if (!this.props.store.mainShowSideMenu) {
      this.props.store.mainPinSideMenu = false
    } else {
      this.props.store.mainPinSideMenu = this.props.store.mainSideMenuWasPinned
    }
  }

  handlePinSideMenuClick (e) {
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
          <HashLink smooth to="/dashboard/#top">
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
        <MainSideMenu
          handleToggleSideMenuClick={this.handleToggleSideMenuClick}
          handlePinSideMenuClick={this.handlePinSideMenuClick} />
        <main id="main_content">
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/exchange/" component={Exchange} />
        </main>
      </div>
    )
  }
}

Main.propTypes = {
  store: PropTypes.object
}

export default Main
