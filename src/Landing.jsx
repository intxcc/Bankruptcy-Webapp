'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const LandingButton = (props) => (
  <div className='landing-btn'>
    <div className="landing-btn-background">
    </div>
    <div className="landing-btn-content">
      {props.text}
    </div>
  </div>
)

LandingButton.propTypes = {
  text: PropTypes.string
}

const HowToPlay = (props) => (
  <div id="howtoplay_wrapper">
    <div id="howtoplay_headline">
      How to play?
    </div>
  </div>
)

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
    <HowToPlay />
  </div>
)

export default Landing
