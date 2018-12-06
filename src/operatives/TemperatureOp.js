import { convertTemperature } from '../helpers/convertTemperature'

export class TemperatureOp {
  constructor (path) {
    this.setPath(path)
  }

  setPath (path) { this.path = path }

  getPath () { return this.path }

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
// remove the need to supply the component and model as arguments.
function action (component, model, processor, args) {
  const proposal = processor.getProposal(component, model, args)
  processor.digest(component, model, proposal)
}

function defaults (component, model, processor) {
  return processor.getProposal(component, model)
}

export const setValue = {
  getProposal (component, model, { value = 0 } = {}) {
    return { value }
  },
  digest (component, model, incoming) {
    if (typeof incoming.value === 'undefined') { return }
    model.set(component.getPath(), ['value'], incoming.value)
  }
}

export const setUnits = {
  getProposal (component, model, { units = 'C' } = {}) {
    return ['C', 'F', 'K'].includes(units)
      ? { units }
      : { units: model.get(component.getPath(), ['units']) }
  },
  digest (component, model, incoming) {
    if (typeof incoming.units === 'undefined') { return }
    const basePath = component.getPath()
    const value = model.get(basePath, ['value'])

    if (typeof value !== 'undefined') {
      const fromUnits = model.get(basePath, ['units'], defaults(component, model, setUnits).units)
      model.set(basePath, ['value'], convertTemperature(value, fromUnits, incoming.units))
    }
    model.set(basePath, ['units'], incoming.units)
  }
}
