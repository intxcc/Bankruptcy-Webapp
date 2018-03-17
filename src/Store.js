import { observable } from 'mobx'

class Store {
  // Saved scroll tops on unmount
  @observable landingScrollTopSaved = 0
  @observable mainScrollTopSaved = 0
}

let store = new Store()

export default store
