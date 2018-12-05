/* global describe, test, expect */

import { Presenter, Supervisor, Model, Actions, Engine } from './index'
import { NormalMutator as Mutator } from './adapters'
// import { ImmutableMutator as Mutator } from './adapters'

describe('counter', () => {
  test('incrementing', () => {
    const presenter = new Presenter()
    const supervisor = new Supervisor()
    const model = new Model(new Mutator())
    const actions = new Actions()

    supervisor.setPresenter(presenter)
    model.setSupervisor(supervisor)
    actions.setModel(model)

    supervisor.process(model)
    expect(presenter.state).toBe(0)

    actions.increment()
    expect(presenter.state).toBe(1)
  })

  test('incrementing, using the engine', () => {
    const engine = new Engine(new Presenter(), new Supervisor(), new Model(new Mutator()), new Actions())

    engine.start()
    expect(engine.getPresenter().state).toBe(0)

    engine.actions.increment()
    expect(engine.getPresenter().state).toBe(1)
  })
})
