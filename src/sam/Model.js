export class Model {
  constructor (mutator) {
    this.setMutator(mutator)

    this.data = {
      counter: 0
    }
  }

  setSupervisor (supervisor) { this.supervisor = supervisor }

  getSupervisor () { return this.supervisor }

  setMutator (mutator) { this.mutator = mutator }

  getMutator () { return this.mutator }

  present (change) {
    if (typeof change.counter !== 'undefined') {
      this.data = this.mutator.set(this.data, ['counter'], change.counter)
    }

    this.supervisor.process(this)
  }
}
