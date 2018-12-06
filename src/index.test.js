/* global describe, test, expect */

import { Presenter, Supervisor, Model, Engine } from './index'
import { NormalMutator as Mutator } from './adapters'
// import { ImmutableMutator as Mutator } from './adapters'

const newEngine = function () {
  const mutator = new Mutator()
  const presenter = new Presenter()
  const supervisor = new Supervisor()
  const model = new Model()
  model.setMutator(mutator)
  return new Engine(presenter, supervisor, model)
}

describe('temperature', () => {
  test('setting the value', () => {
    const engine = newEngine()

    engine.start()
    expect(engine.getPresenter().state).toMatchObject({
      value: 22,
      units: 'C'
    })

    engine.getActions().setTemperature(25)
    expect(engine.getPresenter().state).toMatchObject({
      value: 25,
      units: 'C'
    })
  })

  test('changing the units', () => {
    const engine = newEngine()

    engine.start()
    expect(engine.getPresenter().state).toMatchObject({
      value: 22,
      units: 'C'
    })

    engine.getActions().setTemperatureUnits('F')
    expect(engine.getPresenter().state.units).toBe('F')
    expect(engine.getPresenter().state.value).toBeCloseTo(71.6)

    engine.getActions().setTemperatureUnits('K')
    expect(engine.getPresenter().state.units).toBe('K')
    expect(engine.getPresenter().state.value).toBeCloseTo(295.15)

    engine.getActions().setTemperatureUnits('C')
    expect(engine.getPresenter().state.units).toBe('C')
    expect(engine.getPresenter().state.value).toBeCloseTo(22)

    engine.getActions().setTemperatureUnits('?')
    expect(engine.getPresenter().state.units).toBe('C')
    expect(engine.getPresenter().state.value).toBeCloseTo(22)
  })
})
