/* global describe, test, expect */
import { TemperatureOp } from './TemperatureOp'
import { NormalMutator } from '../adapters/NormalMutator'

function newModel(data = {}, mutator = new NormalMutator()) {
  const model = {
    data,
    opTree: {},
    set (path, value) {
      this.data = mutator.set(this.data, path, value)
    },
    get (path, defaultValue) {
      return mutator.get(this.data, path, defaultValue)
    }
  }
  return model
}

describe('TemperatureOp', () => {
  describe('setValue', () => {
    test('defaults', () => {
      const model = newModel()
      const op = new TemperatureOp()

      op.setValue(model)

      expect(model.data).toMatchObject({ value: 0 })
    })

    test('a valid temperature', () => {
      const model = newModel()
      const op = new TemperatureOp()

      op.setValue(model, { value: 5 })

      expect(model.data).toMatchObject({ value: 5 })
    })

    describe('setUnits', () => {
      test('defaults', () => {
        const model = newModel()
        const op = new TemperatureOp()

        op.setUnits(model)

        expect(model.data).toMatchObject({ units: 'C' })
      })

      test('a valid unit', () => {
        const model = newModel()
        const op = new TemperatureOp()

        op.setUnits(model, { units: 'F' })

        expect(model.data).toMatchObject({ units: 'F' })
      })

      test('a valid unit with a value converts the value', () => {
        const model = newModel({ units: 'C', value: 0 })
        const op = new TemperatureOp()

        op.setUnits(model, { units: 'F' })

        expect(model.data).toMatchObject({ units: 'F' })
        expect(model.data.value).toBeCloseTo(32)
      })
    })
  })
})
