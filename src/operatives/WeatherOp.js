import { TemperatureOp } from './TemperatureOp'
import { action, defaults, mount } from '../sam/functions'

export class WeatherOp {
  mount (model, path) {
    this.model = model
    this.path = path
    mount(this, this.model, this.path)

    if (typeof this.temperature === 'undefined') {
      this.temperature = new TemperatureOp()
    }

    this.temperature.mount(this.model, this.getPath('temperature'))
  }

  reset () {
    this.setLocation()
    this.temperature.reset()
  }

  getPath (...relative) { return (this.path || []).concat(relative) }

  setLocation ({ location } = {}) {
    action(this, this.model, setLocation, { location })
    this.weatherDataPromise = this.restartWeatherCall()
  }

  restartWeatherCall () {
    if (this.weatherCallTimeout) {
      clearTimeout(this.weatherCallTimeout)
    }

    // A fake delay to simulate an asynchronous call...
    return new Promise((resolve, reject) => {
      this.weatherCallTimeout = setTimeout(
        () => {
          this.temperature.setUnits({ units: 'F' })
          this.temperature.setValue({ value: 50 })
          resolve()
        },
        200
      )
    })
  }

  gettingWeatherData () {
    return this.weatherDataPromise
  }
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
