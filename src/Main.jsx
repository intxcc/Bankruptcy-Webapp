'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Home from './Home'

// import { Link } from 'react-router-dom'

class Main extends Component {
  constructor (props) {
    super(props)

    this.state = {
      headerClassName: ''
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount () {
    this.node.scrollTop = this.props.store.mainScrollTopSaved
  }

  componentWillUnmount () {
    this.props.store.mainScrollTopSaved = this.node.scrollTop
  }

  handleScroll (e) {
    if (e.target.scrollTop >= 200 && this.state.headerClassName === '') {
      this.setState({
        headerClassName: 'collapse-main-header'
      })
    } else if (e.target.scrollTop < 50 && this.state.headerClassName !== '') {
      this.setState({
        headerClassName: ''
      })
    }
  }

  render () {
    return (
      <div className={this.state.headerClassName} id="main_wrapper">
        <header id="main_header">
          <div id="main_logo_wrapper">
            <div id="main_logo_logo">
              B<span>ankruptcy</span>!
            </div>
            <div id="main_logo_caption">
              No, really. You are a good daytrader.
            </div>
          </div>
        </header>
        <main id="main_content" onScroll={this.handleScroll} ref={node => { this.node = node }}>
          <Home />
        </main>
      </div>
    )
  }
}

Main.propTypes = {
  store: PropTypes.object
}

export default Main
