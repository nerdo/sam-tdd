import { TemperatureOp } from './TemperatureOp'
import { action, defaults, mount, Operator } from 'alma'
import { FakeWeather } from '../adapters/FakeWeather'

export class WeatherOp extends Operator {
  constructor () {
    super()
    this.setLocation = this.setLocation.bind(this);
  }

  getOpName () { return 'Weather' }

  mount (model, path, parentOp) {
    super.mount(model, path, parentOp)

    if (typeof this.temperature === 'undefined') {
      this.temperature = new TemperatureOp()
      this.addNestedOp(this.temperature)
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
