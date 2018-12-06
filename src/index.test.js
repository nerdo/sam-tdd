/* global describe, test, expect */

import { Presenter, Supervisor, Model, Engine } from './index'
import { NormalMutator as Mutator } from './adapters'
// import { ImmutableMutator as Mutator } from './adapters'
import { TemperatureOp } from './operatives/TemperatureOp'

const newEngine = function (opTree, data) {
  const mutator = new Mutator()
  const presenter = new Presenter()
  const supervisor = new Supervisor()
  const model = new Model()

  model.setMutator(mutator)
  model.set([], data)
  model.setOpTree(opTree)

  return new Engine(presenter, supervisor, model)
}

describe('temperature', () => {
  test('setting the value', () => {
    const air = new TemperatureOp()
    const engine = newEngine({ air })

    engine.reset()
    engine.start()
    expect(engine.getPresenter().state).toMatchObject({
      air: {
        value: 0,
        units: 'C'
      }
    })

    air.setValue({ value: 25 })
    expect(engine.getPresenter().state).toMatchObject({
      air: {
        value: 25,
        units: 'C'
      }
    })
  })

  test('changing the units', () => {
    const air = new TemperatureOp()
    const initialData = {
      air: {
        value: 22,
        units: 'C'
      }
    }
    const engine = newEngine({ air }, initialData)

    engine.start()
    expect(engine.getPresenter().state).toMatchObject({
      air: {
        value: 22,
        units: 'C'
      }
    })

    air.setUnits({ units: 'F' })
    expect(engine.getPresenter().state.air.units).toBe('F')
    expect(engine.getPresenter().state.air.value).toBeCloseTo(71.6)

    air.setUnits({ units: 'K' })
    expect(engine.getPresenter().state.air.units).toBe('K')
    expect(engine.getPresenter().state.air.value).toBeCloseTo(295.15)

    air.setUnits({ units: 'C' })
    expect(engine.getPresenter().state.air.units).toBe('C')
    expect(engine.getPresenter().state.air.value).toBeCloseTo(22)

    air.setUnits({ units: '?' })
    expect(engine.getPresenter().state.air.units).toBe('C')
    expect(engine.getPresenter().state.air.value).toBeCloseTo(22)
  })
})
