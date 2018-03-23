'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { HashLink } from 'react-router-hash-link'

import Home from './Home'
import Exchange from './Exchange'

const SideMenu = (props) => (
  <nav id="main-side-menu">
  </nav>
)

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      headerClassName: '',
      headerLogoHeight: 1000
    }

    this.handleBodyScroll = this.handleBodyScroll.bind(this)
  }

  componentDidMount () {
    document.addEventListener('scroll', this.handleBodyScroll)

    this.mainHeader.scrollTop = this.props.store.mainScrollTopSaved

    this.setState({
      headerClassName: '',
      headerLogoHeight: this.mainHeaderLogo.clientHeight
    })
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleBodyScroll)

    this.props.store.mainScrollTopSaved = this.mainHeader.scrollTop
  }

  handleBodyScroll (e) {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    let collapse = (this.mainHeader.clientHeight - this.state.headerLogoHeight) - scrollTop <= 0
    if (collapse && this.state.headerClassName === '') {
      this.setState({
        headerClassName: 'collapse-main-header',
        headerLogoHeight: this.state.headerLogoHeight
      })
    } else if (!collapse && this.state.headerClassName !== '') {
      this.setState({
        headerClassName: '',
        headerLogoHeight: this.state.headerLogoHeight
      })
    }
  }

  render () {
    return (
      <div className={this.state.headerClassName} id="main_wrapper">
        <a id="top" name="top"></a>
        <div id="main-side-menu"></div>
        <header id="main_header" ref={mainHeader => { this.mainHeader = mainHeader }}>
          <HashLink smooth to="/home/#top">
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
        <SideMenu />
        <main id="main_content">
          <Route path="/home" component={Home} />
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
