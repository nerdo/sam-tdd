import { convertTemperature } from '../helpers/convertTemperature'

export class Model {
  constructor (mutator) {
    this.setMutator(mutator)

    this.data = {
      value: 22,
      units: 'C'
    }
  }

  setSupervisor (supervisor) { this.supervisor = supervisor }

  getSupervisor () { return this.supervisor }

  setMutator (mutator) { this.mutator = mutator }

  getMutator () { return this.mutator }

  get (path, defaultValue = void 0) { return this.mutator.get(this.data, path, defaultValue) }

  present (incoming) {
    if (typeof incoming.value !== 'undefined') {
      // this.data = this.mutator.set(this.data, ['changed', 'units'])
      this.data = this.mutator.set(this.data, ['value'], incoming.value)
    }

    if (typeof incoming.units !== 'undefined' && ['C', 'F', 'K'].includes(incoming.units)) {
      this.data = this.mutator.set(
        this.data,
        ['value'],
        convertTemperature(this.data.value, this.data.units, incoming.units)
      )
      // this.data = this.mutator.set(this.data, ['changed', 'units'], this.get(['units']))
      this.data = this.mutator.set(this.data, ['units'], incoming.units)
    }

    this.supervisor.process(this)
  }
}
