/* global describe, test, expect */
import { TemperatureOp } from './TemperatureOp'
import { NormalMutator } from '../adapters/NormalMutator'

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
    })
  })
})
