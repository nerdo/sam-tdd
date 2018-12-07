import { convertTemperature } from '../helpers/convertTemperature'
import { action, defaults, mount } from '../sam/functions'

export class TemperatureOp {
  mount (model, path) {
    this.model = model
    this.path = path
    mount(this, this.model, this.path)

    this.setValue = this.setValue.bind(this);
    this.setUnits = this.setUnits.bind(this);
  }

  getPath (...relative) { return (this.path || []).concat(relative) }

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
    return this.model.get(this.getPath('value'))
  }

  getUnits () {
    return this.model.get(this.getPath('units'))
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
