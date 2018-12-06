import { WeatherConditions } from '../entities/WeatherConditions';
import axios from 'axios'

export class OpenWeather {
  constructor (apiKey) {
    this.apiKey = apiKey
    this.getCurrentWeatherSource = axios.CancelToken.source()
  }

  async getCurrentWeather (city, restart) {
    if (restart) {
      this.getCurrentWeatherSource.cancel()
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?APPID=${this.apiKey}&q=${encodeURIComponent(city)}`
    return axios
      .get(url, { cancelToken: this.getCurrentWeatherSource.token })
      .then(response => {
        return new WeatherConditions(response.data.main.temp, 'K')
      })
  }
}
