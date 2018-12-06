import { TemperatureOp } from './TemperatureOp';

export class WeatherOp {
  constructor (model, path) {
    this.mount(model, path)
  }

  mount (model, path) {
    this.model = model
    this.path = path
    mount(this, this.model, this.path)

    this.temperature = typeof this.temperature === 'undefined'
      ? new TemperatureOp(this.model, this.getPath('temperature'))
      : this.temperature.mount(this.model, this.getPath('temperature'))
  }

  reset () {
    this.setLocation()
    this.temperature.reset()
  }

  getPath (...relative) { return (this.path || []).concat(relative) }

  setLocation ({ location } = {}) {
    action(this, this.model, setLocation, { location })
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

function mount (op, model, path) {
  return op
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
