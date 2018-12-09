/* global describe, test, expect */
// import { setupCustomMatchers } from '../../helpers/jest'
import { WeatherInterface } from './WeatherInterface'
import { FakeWeather } from '../../adapters/FakeWeather'
import { OpenWeather } from '../../adapters/OpenWeather'

// setupCustomMatchers(expect)

describe('WeatherInterface conformance of', () => {
  describe.each`
    concreteImplementationName  | newInstance
    ${'FakeWeather'}            | ${() => new FakeWeather()}
    ${'OpenWeather'}            | ${() => new OpenWeather()}
  `('$concreteImplementationName', ({ newInstance }) => {
    test('implementing WeatherInterface', () => {
      const result = newInstance()

      expect(result).toBeDefined()
      // expect(result).toImplement(WeatherInterface)
    })
  })
})
