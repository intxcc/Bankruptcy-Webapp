'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

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
    <a name="howto" id="howto"></a>
    <div id="howtoplay_headline">
      How to play?
    </div>
    <HashLink smooth to="/#start" id="back_to_top_link">
      &#x1f845;
    </HashLink>
  </div>
)

class Landing extends Component {
  componentDidMount () {
    this.node.scrollTop = this.props.store.landingScrollTopSaved
  }

  componentWillUnmount () {
    this.props.store.landingScrollTopSaved = this.node.scrollTop
  }

  render () {
    return (
      <div ref={node => { this.node = node }} id="landing_wrapper_outer">
        <a name="start" id="start"></a>
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
                <HashLink smooth to="#howto">
                  <LandingButton text="How to play?" />
                </HashLink>
              </div>
            </div>
          </div>
        </div>
        <HowToPlay ref={(section) => { this.Violet = section }} />
      </div>
    )
  }
}

Landing.propTypes = {
  store: PropTypes.object
}

export default Landing
