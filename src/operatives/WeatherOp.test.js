/* global describe, test, expect */
import { WeatherOp } from './WeatherOp'
import { NormalMutator, ImmutableMutator } from '../adapters'

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
    }
  }
  return model
}

describe('WeatherOp', () => {
  describe('setLocation', () => {
    test('defaults', () => {
      const model = newModel()
      const op = new WeatherOp(model)

      op.setLocation()

      expect(model.data.location).toBeUndefined()
    })

    test('a valid location', () => {
      const model = newModel()
      const op = new WeatherOp(model)

      op.setLocation({ location: 'Guadalajara, Jalisco, MX' })

      expect(model.data).toMatchObject({ location: 'Guadalajara, Jalisco, MX' })
    })

    describe('temperature', () => {
      test('experimenting with operative composition', () => {
        const model = newModel()
        const op = new WeatherOp(model, ['foo'])
        // const op = new WeatherOp()

        op.reset()
        op.setLocation({ location: 'Guadalajara, Jalisco, MX' })

        model.data//?
        model.opTree.foo.temperature//?
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
