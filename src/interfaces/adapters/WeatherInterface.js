import { WeatherConditions } from '../../entities/WeatherConditions';

export class WeatherInterface {
  /**
   * Gets the current weather conditions.
   * @param {string} city - Name of the city.
   * @param {boolean} restart - Whether or not to restart (cancel) pending calls and start a new call.
   * @returns {WeatherConditions}
   */
  async getCurrentWeather (city, restart) { throw new Error('Not Yet Implemented') }
}
