import es6ClassBindAll from 'es6-class-bind-all'
import { TemperatureOp } from './TemperatureOp'
import { action, defaults, mount } from '../sam/functions'
import { FakeWeather } from '../adapters/FakeWeather'

export class WeatherOp {
  mount (model, path) {
    this.model = model
    this.path = path
    mount(this, this.model, this.path)

    if (typeof this.temperature === 'undefined') {
      this.temperature = new TemperatureOp()
    }

    this.temperature.mount(this.model, this.getPath('temperature'))
    es6ClassBindAll(this)
  }

  reset () {
    this.setLocation()
    this.temperature.reset()
  }

  getPath (...relative) { return (this.path || []).concat(relative) }

  setLocation ({ location } = {}) {
    action(this, this.model, setLocation, { location })
    this.weatherDataPromise = this.restartWeatherCall(location)
  }

  setWeatherService (service) {
    this.weatherService = service
  }

  restartWeatherCall (location) {
    if (!this.weatherService) {
      this.setWeatherService(new FakeWeather())
    }
    return this.weatherService
      .getCurrentWeather(location, true)
      .then(weather => {
        this.temperature.setUnits({ units: weather.temperature.units })
        this.temperature.setValue({ value: weather.temperature.value })
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
