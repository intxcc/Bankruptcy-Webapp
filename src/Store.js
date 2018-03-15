import { observable } from 'mobx'

class Store {
  @observable scrollValue = 0
}

let store = new Store()

export default store
