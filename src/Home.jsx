'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { Link } from 'react-router-dom'

class Start extends Component {
  componentDidMount () {
    this.node.scrollTop = this.props.store.homeScrollTopSaved
  }

  componentWillUnmount () {
    this.props.store.homeScrollTopSaved = this.node.scrollTop
  }

  render () {
    return (
      <div ref={node => { this.node = node }} id="home_wrapper">
        <header id="home_header">
          <div id="home_logo_wrapper">
            <div id="home_logo_logo">
              B<span>ankruptcy</span>!
            </div>
            <div id="home_logo_caption">
              No, really. You are a good daytrader.
            </div>
          </div>
        </header>
        <main id="home_content">
        </main>
      </div>
    )
  }
}

Start.propTypes = {
  store: PropTypes.object
}

export default Start
