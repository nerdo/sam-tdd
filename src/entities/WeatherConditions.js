export class WeatherConditions {
  constructor (temperature, units) {
    this.temperature = {}
    this.temperature.value = temperature
    this.temperature.units = units
  }
}
