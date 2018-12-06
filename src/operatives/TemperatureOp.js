import { convertTemperature } from '../helpers/convertTemperature'

export class TemperatureOp {
  constructor (path) {
    this.setPath(path)
  }

  setPath (path) { this.path = path }

  getPath (...relative) { return (this.path || []).concat(relative) }

  reset (model) {
    this.setValue(model)
    this.setUnits(model)
  }

  setValue (model, { value } = {}) {
    action(this, model, setValue, { value })
  }

  setUnits (model, { units } = {}) {
    action(this, model, setUnits, { units })
  }
}

// TODO refactor action and defaults into a separate module, import them, and bind calls to them to
// remove the need to supply the op and model as arguments.
function action (op, model, processor, args) {
  const proposal = processor.getProposal(op, model, args)
  processor.digest(op, model, proposal)
}

function defaults (op, model, processor) {
  return processor.getProposal(op, model)
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
      : { units: model.get(op.getPath(), ['units']) }
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
