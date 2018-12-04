/* global describe, test, expect */

import { View, State, Model, Actions, Engine } from './index'

describe('counter', () => {
  test('incrementing', () => {
    const view = new View()
    const state = new State()
    const model = new Model()
    const actions = new Actions()

    state.setView(view)
    model.setState(state)
    actions.setModel(model)

    state.render(model)
    expect(view.representation).toBe(0)

    actions.increment()
    expect(view.representation).toBe(1)
  })

  test('incrementing, using the engine', () => {
    const engine = new Engine(new View(), new State(), new Model(), new Actions())

    engine.start()
    expect(engine.view.representation).toBe(0)

    engine.actions.increment()
    expect(engine.view.representation).toBe(1)
  })
})
