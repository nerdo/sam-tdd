/* global describe, test, expect */
import { WeatherOp } from './WeatherOp'
import { NormalMutator, ImmutableMutator } from '../adapters'

function newModel (data = {}) {
  const mutator = new NormalMutator()
  const model = {
    data,
    set (basePath, relativePath, value) {
      this.data = mutator.set(this.data, (basePath || []).concat(relativePath || []), value)
    },
    get (basePath, relativePath) {
      return mutator.get(this.data, (basePath || []).concat(relativePath || []))
    }
  }
  return model
}

describe('WeatherOp', () => {
  describe('setLocation', () => {
    test('defaults', () => {
      const model = newModel()
      const op = new WeatherOp()

      op.setLocation(model)

      expect(model.data.location).toBeUndefined()
    })

    test('a valid location', () => {
      const model = newModel()
      const op = new WeatherOp()

      op.setLocation(model, { location: 'Guadalajara, Jalisco, MX' })

      expect(model.data).toMatchObject({ location: 'Guadalajara, Jalisco, MX' })
    })

    describe('temperature', () => {
      test('experimenting with operative composition', () => {
        const model = newModel()
        const op = new WeatherOp(['foo'])
        // const op = new WeatherOp()

        op.reset(model)
        op.setLocation(model, { location: 'Guadalajara, Jalisco, MX' })

        model.data//?
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
