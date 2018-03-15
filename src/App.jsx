'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { observer } from 'mobx-react'

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

  /* <div id="landing_top">
        <div id="landing_top_bg">

        </div>
      </div> */

  render () {
    return (
      <div id='landing_wrapper'>
        <div id="landing_wrapper_background">
        </div>
        <div id="logo_wrapper">
          <div id="logo_caption">
            No, really. You are a good daytrader.
          </div>
          <div id='logo'>
            B<span>ankruptcy</span>!
          </div>
        </div>
        <div id="landing_bottom_wrapper">
        </div>
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
