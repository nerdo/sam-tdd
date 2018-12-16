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
    // In Redux, state is updated by dispatching an action, which results in (1) updating the state via reducers, and
    // (2) notifying listeners with the new state. In our implementation, dispatch just notifies listeners (2).
    // setState simulates updating the state via reducers (1).
    this.state = state
    this.dispatch({})
  }
}
