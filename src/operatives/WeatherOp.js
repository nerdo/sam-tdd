import { TemperatureOp } from './TemperatureOp';

export class WeatherOp {
  constructor (path) {
    this.temperature = new TemperatureOp()
    this.setPath(path)
  }

  reset (model) {
    // this.setLocation(model)
    this.temperature.reset(model)
  }

  setPath (path) {
    this.path = path
    this.temperature.setPath((this.path || []).concat('temperature'))
  }

  getPath () { return this.path }

  setLocation (model, { location } = {}) {
    action(setLocation, this, model, { location })
    // const proposal = setLocation.getProposal(this, model, { location })
    // setLocation.digest(this, model, proposal)
  }
}

function action (processor, component, model, args) {
    const proposal = processor.getProposal(component, model, args)
    processor.digest(component, model, proposal)
}

export const setLocation = {
  getProposal (component, model, { location = void 0 } = {}) {
    return { location }
  },
  digest (component, model, incoming) {
    if (typeof incoming.location === 'undefined') { return }
    model.set(component.getPath(), ['location'], incoming.location)
  }
}
