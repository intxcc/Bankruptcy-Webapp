'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import { observer } from 'mobx-react'

import Landing from './Landing'
import Home from './Home'

import StyleVariables from '../style/variables.scss'

const AppTransitionGroup = (props) => (
  <TransitionGroup>
    <CSSTransition key={props.location.pathname} classNames="fade" timeout={parseInt(StyleVariables.routeTransitionTime)}>
      <Switch location={props.location}>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

AppTransitionGroup.propTypes = {
  location: PropTypes.object
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
      <Router>
        <div id="site_wrapper">
          <Route render={({ location }) => (
            <AppTransitionGroup location={location} />
          )} />
          <div id="landing_bottom_info">
            <div id="landing_bottom_info_left">
              Copyright {(new Date()).getFullYear()} &middot; Created with love by intx&middot;cc
            </div>
            <div id="landing_bottom_info_right">
              Bankruptcy on GitHub &middot; Impressum
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
