export class ReduxCompatibleStore {
  constructor () {
    this.listeners = new Map()
  }

  subscribe (listener) {
    const unsubscribe = () => this.listeners.delete(listener)
    this.listeners.set(listener, unsubscribe)
    return unsubscribe
  }

  getState () {
    return this.state
  }

  dispatch (action) {
    for (const listener of this.listeners.keys()) {
      listener()
    }
    return action
  }

  setState (state) {
    this.state = state
  }
}
