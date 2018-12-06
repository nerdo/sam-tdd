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
    action(this, model, setLocation, { location })
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

export const setLocation = {
  getProposal (component, model, { location = void 0 } = {}) {
    return { location }
  },
  digest (component, model, incoming) {
    if (typeof incoming.location === 'undefined') { return }
    model.set(component.getPath(), ['location'], incoming.location)
  }
}
