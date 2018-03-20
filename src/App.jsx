'use strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import { observer } from 'mobx-react'

import Landing from './Landing'
import Main from './Main'

import { toggleFullscreen, canFullscreen, isFullscreen } from './misc.js'

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
          render={routeProps => <Main {...Object.assign({}, routeProps, {store: props.store})} />} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

AppTransitionGroup.propTypes = {
  location: PropTypes.object,
  store: PropTypes.object
}

const RequestFullscreenButton = (props) => (
  <div id="request_fullscreen_btn" onClick={props.toggleFullscreen}>
    <i className={'fas ' + (props.isFullscreen ? 'fa-compress' : 'fa-expand')}></i>
  </div>
)

RequestFullscreenButton.propTypes = {
  isFullscreen: PropTypes.bool,
  toggleFullscreen: PropTypes.func
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isFullscreen: false
    }

    this.toggleFullscreen = this.toggleFullscreen.bind(this)
    this.setToggleFullscreenIcon = this.setToggleFullscreenIcon.bind(this)
  }

  componentDidMount () {
    if (canFullscreen()) {
      document.addEventListener('webkitfullscreenchange', this.setToggleFullscreenIcon)
      document.addEventListener('mozfullscreenchange', this.setToggleFullscreenIcon)
      document.addEventListener('MSFullscreenChange', this.setToggleFullscreenIcon)
      document.addEventListener('fullscreenchange', this.setToggleFullscreenIcon)
    }
  }

  componentWillUnmount () {
    if (canFullscreen()) {
      document.removeEventListener('webkitfullscreenchange', this.setToggleFullscreenIcon)
      document.removeEventListener('mozfullscreenchange', this.setToggleFullscreenIcon)
      document.removeEventListener('MSFullscreenChange', this.setToggleFullscreenIcon)
      document.removeEventListener('fullscreenchange', this.setToggleFullscreenIcon)
    }
  }

  setToggleFullscreenIcon (e) {
    this.setState({
      isFullscreen: isFullscreen()
    })
  }

  toggleFullscreen (e) {
    toggleFullscreen()

    this.setState({
      isFullscreen: !this.state.isFullscreen
    })
  }

  render () {
    return (
      <Router>
        <div id="site_wrapper">
          <RequestFullscreenButton
            toggleFullscreen={this.toggleFullscreen}
            isFullscreen={this.state.isFullscreen} />
          <Route render={({ location }) => (
            <AppTransitionGroup location={location} store={this.props.store} />
          )} />
          <div id="bottom_info">
            <div id="bottom_info_left">
              Copyright {(new Date()).getFullYear()} &middot; Created with love by intx&middot;cc
            </div>
            <div id="bottom_info_right">
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
