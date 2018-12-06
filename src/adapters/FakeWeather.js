import { WeatherConditions } from '../entities/WeatherConditions';

export class FakeWeather {
  constructor (delayInMilliseconds = 200) {
    this.delayInMilliseconds = delayInMilliseconds
  }

  async getCurrentWeather (city, restart) {
    if (restart && this.getCurrentWeatherTimeout) {
      clearTimeout(this.getCurrentWeatherTimeout)
    }

    // A fake delay to simulate an asynchronous call...
    return new Promise((resolve, reject) => {
      this.weatherCallTimeout = setTimeout(
        () => { resolve(new WeatherConditions(50, 'F')) },
        this.delayInMilliseconds
      )
    })
  }
}
