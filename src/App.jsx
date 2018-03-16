'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { observer } from 'mobx-react'

import Landing from './Landing'

class App extends Component {
  constructor (props) {
    super(props)

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll (e) {
    this.props.store.scrollValue = e.pageY
  }

  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    return (
      <div id="site_wrapper">
        <Landing />
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
