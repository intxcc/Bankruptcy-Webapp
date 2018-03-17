import { observable } from 'mobx'

class Store {
  // Saved scroll tops on unmount
  @observable landingScrollTopSaved = 0
  @observable homeScrollTopSaved = 0
}

let store = new Store()

export default store
