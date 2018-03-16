'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

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

const Landing = props => (
  <div id="landing_wrapper_outer">
    <div id="landing_wrapper_outer_background">
    </div>
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
            <Link to="/home">
              <LandingButton text="Start Game" />
            </Link>
            <Link to="#howto">
              <LandingButton text="How to play?" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div id="howtoplay_wrapper">
      <div id="tttttest">
        How to play?
      </div>
    </div>
  </div>
)

export default Landing
