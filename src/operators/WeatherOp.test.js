/* global describe, test, expect */
import { WeatherOp } from './WeatherOp'
import { NormalMutator } from 'alma'
// import { ImmutableMutator } from '../adapters'

function newModel (data = {}, mutator = new NormalMutator()) {
  const normalMutator = new NormalMutator()
  const model = {
    data,
    opTree: {},
    set (path, value) {
      this.data = mutator.set(this.data, path, value)
    },
    get (path, defaultValue) {
      return mutator.get(this.data, path, defaultValue)
    },
    getOpTree (path) {
      return normalMutator.get(this.opTree, path)
    },
    getSupervisor () {
      return {
        process (model) { }
      }
    }
  }
  return model
}

describe('WeatherOp', () => {
  describe('setLocation', () => {
    test('defaults', () => {
      const model = newModel()
      const op = new WeatherOp()
      op.mount(model)

      op.setLocation()

      expect(model.data.location).toBeUndefined()
    })

    test('a valid location', () => {
      const model = newModel()
      const op = new WeatherOp()
      op.mount(model)

      op.setLocation({ location: 'Guadalajara' })

      expect(model.data).toMatchObject({ location: 'Guadalajara' })
    })

    describe('setting temperature', () => {
      test('async call', async () => {
        const model = newModel()
        const op = new WeatherOp()
        op.mount(model)

        op.setLocation({ location: 'Guadalajara' })

        // Wait for the side-effect (getting weather data) to complete...
        await op.gettingWeatherData()

        expect(model.data).toMatchObject({
          temperature: {
            units: 'F',
            value: 50
          }
        })
      })

      test('experimenting with operator composition', () => {
        const model = newModel()
        const op = new WeatherOp()
        op.mount(model)

        op.reset()
        op.setLocation({ location: 'Guadalajara, Jalisco, MX' })

        model.data//?
        model.getOpTree(['foo'])//?
      })

      // test('a valid unit', () => {
      //   const model = newModel()
      //   const op = new WeatherOp()

      //   op.setUnits(model, { units: 'F' })

      //   expect(model.data).toMatchObject({ units: 'F' })
      // })
    })
  })
})
