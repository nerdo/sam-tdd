import { TemperatureOp } from './TemperatureOp';

export class WeatherOp {
  constructor (path) {
    this.temperature = new TemperatureOp()
    this.setPath(path)
  }

  reset (model) {
    this.setLocation(model)
    this.temperature.reset(model)
  }

  setPath (path) {
    this.path = path
    this.temperature.setPath((this.path || []).concat('temperature'))
  }

  getPath (...relative) { return (this.path || []).concat(relative) }

  setLocation (model, { location } = {}) {
    action(this, model, setLocation, { location })
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

export const setLocation = {
  getProposal (op, model, { location = void 0 } = {}) {
    return { location }
  },
  digest (op, model, incoming) {
    if (typeof incoming.location === 'undefined') { return }
    model.set(op.getPath('location'), incoming.location)
  }
}
