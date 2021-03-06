'use strict'

import { observable } from 'mobx'

class Store {
  // Saved scroll tops on unmount
  @observable landingScrollTopSaved = 0
  @observable mainScrollTopSaved = 0

  // Main header state
  @observable mainHeaderLogoHeight = 1000
  @observable mainHeaderCollapsed = false

  // Main side menu state
  @observable mainShowSideMenu = false
  @observable mainShowSideMenuTouched = false
  @observable mainSideMenuWasPinned = false
  @observable mainPinSideMenu = false

  @observable dashboardBigMenuClosed = false

  @observable exchangeChartIsBeeingDragged = false
  @observable exchangeChartSelection = false

  @observable exchangeChartData = false
  @observable exchangeChartDataHasChanged = false

  changeExchangeChartIsBeeingDragged = (store, newValue) => {
    store.exchangeChartIsBeeingDragged = newValue
  }

  closeBigMenu = (store) => {
    store.dashboardBigMenuClosed = true
  }
}

let store = new Store()

export default store
