/* global describe, test, expect */
import { TemperatureOp } from './TemperatureOp'
import { NormalMutator } from 'alma'
import { operatorConformanceTests } from 'alma/dist/conformance-tests'

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

describe('TemperatureOp', () => {
  operatorConformanceTests(
    {
      TemperatureOp: () => new TemperatureOp()
    },
    describe,
    test,
    expect
  )

  describe('setValue', () => {
    test('defaults', () => {
      const model = newModel()
      const op = new TemperatureOp()
      op.mount(model)

      op.setValue(model)

      expect(model.data).toMatchObject({ value: 0 })
    })

    test('a valid temperature', () => {
      const model = newModel()
      const op = new TemperatureOp()
      op.mount(model)

      op.setValue({ value: 5 })

      expect(model.data).toMatchObject({ value: 5 })
    })

    describe('setUnits', () => {
      test('defaults', () => {
        const model = newModel()
        const op = new TemperatureOp()
        op.mount(model)

        op.setUnits(model)

        expect(model.data).toMatchObject({ units: 'C' })
      })

      test('a valid unit', () => {
        const model = newModel()
        const op = new TemperatureOp()
        op.mount(model)

        op.setUnits({ units: 'F' })

        expect(model.data).toMatchObject({ units: 'F' })
      })

      test('a valid unit with a value converts the value', () => {
        const model = newModel({ units: 'C', value: 0 })
        const op = new TemperatureOp()
        op.mount(model)

        op.setUnits({ units: 'F' })

        expect(model.data).toMatchObject({ units: 'F' })
        expect(model.data.value).toBeCloseTo(32)
      })
    })
  })
})
