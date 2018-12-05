/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Engine, Presenter, Supervisor, Model, Actions } from '../../sam'
import { PresenterInterface, SupervisorInterface, ModelInterface, ActionsInterface } from './'
import { EngineInterface } from './EngineInterface';

setupCustomMatchers(expect)

const newEngine = () => new Engine(new Presenter(), new Supervisor(), new Model(), new Actions())

describe('EngineInterface conformance', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Engine'}                | ${newEngine}
  `('$concreteImplementationName', ({ newInstance }) => {
    const engine = newInstance()
    expect(engine).toImplement(EngineInterface)

    const presenter = engine.getPresenter()
    expect(presenter).toImplement(PresenterInterface)
    expect(() => engine.setPresenter(presenter)).not.toThrow()

    const supervisor = engine.getSupervisor()
    expect(supervisor).toImplement(SupervisorInterface)
    expect(() => engine.setSupervisor(supervisor)).not.toThrow()

    const model = engine.getModel()
    expect(model).toImplement(ModelInterface)
    expect(() => engine.setModel(model)).not.toThrow()

    const actions = engine.getActions()
    expect(actions).toImplement(ActionsInterface)
    expect(() => engine.setActions(actions)).not.toThrow()

    expect(() => engine.start()).not.toThrow()
  })
})
