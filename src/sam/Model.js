export class Model {
  constructor () {
    this.data = {
      counter: 0
    }
  }

  setSupervisor (supervisor) {
    this.supervisor = supervisor
  }

  present (change) {
    if (typeof change.counter !== 'undefined') {
      this.data.counter = change.counter
    }

    this.supervisor.process(this)
  }
}
