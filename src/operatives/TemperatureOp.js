import { convertTemperature } from '../helpers/convertTemperature'
import { NormalMutator } from '../adapters';

export class TemperatureOp {
  constructor (model, path) {
    this.mount(model, path)
  }

  mount (model, path) {
    this.model = model
    this.path = path
    mount(this, this.model, this.path)
  }

  getPath (...relative) { return (this.path || []).concat(relative) }

  reset () {
    this.setValue(this.model)
    this.setUnits(this.model)
  }

  setValue ({ value } = {}) {
    action(this, this.model, setValue, { value })
  }

  setUnits ({ units } = {}) {
    action(this, this.model, setUnits, { units })
  }
}

// TODO refactor action and defaults into a separate module
function action (op, model, processor, args) {
  const proposal = processor.getProposal(op, model, args)
  processor.digest(op, model, proposal)
}

function defaults (op, model, processor) {
  return processor.getProposal(op, model)
}

const normalMutator = new NormalMutator()
function mount (op, model, path) {
  model.opTree = normalMutator.set(model.opTree, path, op)
  return op
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
