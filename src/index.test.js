/* global describe, test, expect */

import { Presenter, Supervisor, Model, Actions, Engine } from './index'

describe('counter', () => {
  test('incrementing', () => {
    const presenter = new Presenter()
    const supervisor = new Supervisor()
    const model = new Model()
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
    const engine = new Engine(new Presenter(), new Supervisor(), new Model(), new Actions())

    engine.start()
    expect(engine.presenter.state).toBe(0)

    engine.actions.increment()
    expect(engine.presenter.state).toBe(1)
  })
})
