'use strict'

import React from 'react'
import PropTypes from 'prop-types'

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

const Landing = props => {
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
            <LandingButton text="Start Game" />
            <LandingButton text="How to play?" />
            <LandingButton text="Create account" />
            <LandingButton text="Login" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
