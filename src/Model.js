export class Model {
  constructor () {
    this.data = {
      counter: 0
    }

    this.present = this.present.bind(this)
  }

  setSupervisor (supervisor) {
    this.supervisor = supervisor
  }

  present (change = { counter: 0 }) {
    if (typeof change.counter !== 'undefined') {
      this.data.counter = change.counter
    }

    this.supervisor.process(this)
  }
}
