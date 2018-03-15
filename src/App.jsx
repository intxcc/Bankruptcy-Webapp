'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { observer } from 'mobx-react'

const LandingButton = (props) => (
  <div className='landing_btn'>
    <div className="landing_btn_background">
    </div>
    <div className="landing_btn_content">
      {props.text}
    </div>
  </div>
)

LandingButton.propTypes = {
  text: PropTypes.string
}

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
      <div id="landing_wrapper">
        <div id="landing_wrapper_background">
        </div>
        <div id="logo_wrapper">
          <div id="logo_wrapper_inner">
            <div id="logo_caption">
              No, really. You are a good daytrader.
            </div>
            <div id="logo">
              B<span>ankruptcy</span>!
            </div>
            <div id="landing_bottom">
              <LandingButton text="How to play" />
              <LandingButton text="Start" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
