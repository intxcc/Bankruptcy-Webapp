'use strict'

import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

// import { observer } from 'mobx-react'

import Landing from './Landing'
import Home from './Home'

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
      <Router>
        <div id="site_wrapper">
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
