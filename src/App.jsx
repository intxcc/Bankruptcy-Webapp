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
        <Route
          exact path="/"
          render={routeProps => <Landing {...Object.assign({}, routeProps, {store: props.store})} />} />
        <Route
          exact path="/home"
          render={routeProps => <Home {...Object.assign({}, routeProps, {store: props.store})} />} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

AppTransitionGroup.propTypes = {
  location: PropTypes.object,
  store: PropTypes.object
}

class App extends Component {
  render () {
    return (
      <Router>
        <div id="site_wrapper">
          <Route render={({ location }) => (
            <AppTransitionGroup location={location} store={this.props.store} />
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
