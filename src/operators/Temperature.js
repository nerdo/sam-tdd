import { convertTemperature } from '../helpers/convertTemperature'
import { action, defaults, mount, Operator } from 'alma'

export class Temperature extends Operator {
  constructor () {
    super()
    this.setValue = this.setValue.bind(this);
    this.setUnits = this.setUnits.bind(this);
  }

  getOpName () { return 'Temperature' }

  reset () {
    this.setValue()
    this.setUnits()
  }

  setValue ({ value } = {}) {
    action(this, this.model, setValue, { value })
  }

  setUnits ({ units } = {}) {
    action(this, this.model, setUnits, { units })
  }

  getValue () {
    return this.getModelData(['value'])
  }

  getUnits () {
    return this.getModelData(['units'])
  }

  // nextAction () {
  //   console.log('called')
  // }
}

export const setValue = {
  getProposal (op, model, { value = 0 } = {}) {
    return { value }
  },
  digest (op, model, incoming) {
    if (typeof incoming.value === 'undefined') { return }
    model.set(op.getPath('value'), incoming.value)
  }
}

export const setUnits = {
  getProposal (op, model, { units = 'C' } = {}) {
    return ['C', 'F', 'K'].includes(units)
      ? { units }
      : { units: model.get(op.getPath('units')) }
  },
  digest (op, model, incoming) {
    if (typeof incoming.units === 'undefined') { return }
    const value = model.get(op.getPath('value'))

    if (typeof value !== 'undefined') {
      const fromUnits = model.get(op.getPath('units'), defaults(op, model, setUnits).units)
      model.set(op.getPath('value'), convertTemperature(value, fromUnits, incoming.units))
    }
    model.set(op.getPath('units'), incoming.units)
  }
}
