export class Model {
  constructor () {
    this.data = {
      counter: 0
    }

    this.present = this.present.bind(this)
  }

  setState (state) {
    this.state = state
  }

  present (change = { counter: 0 }) {
    if (typeof change.counter !== 'undefined') {
      this.data.counter = change.counter
    }

    this.state.render(this)
  }
}
