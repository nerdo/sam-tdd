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
    const proposal = setValue.getProposal(this, model, { value })
    setValue.digest(this, model, proposal)
  }

  setUnits (model, { units } = {}) {
    const proposal = setUnits.getProposal(this, model, { units })
    setUnits.digest(this, model, proposal)
  }
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
    model.set(component.getPath(), ['units'], incoming.units)
  }
}
