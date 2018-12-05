/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Engine } from '../../sam'
import { EngineInterface } from './';

setupCustomMatchers(expect)

const newEngine = () => new Engine()

describe('EngineInterface conformance', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Engine'}                | ${newEngine}
  `('$concreteImplementationName', ({ newInstance }) => {
    const engine = newInstance()
    expect(engine).toImplement(EngineInterface)

    expect(() => engine.setPresenter(null)).not.toThrow()
    expect(engine.getPresenter()).toBe(null)

    expect(() => engine.setSupervisor(null)).not.toThrow()
    expect(engine.getSupervisor()).toBe(null)

    expect(() => engine.setModel(null)).not.toThrow()
    expect(engine.getModel()).toBe(null)

    expect(() => engine.setActions(null)).not.toThrow()
    expect(engine.getActions()).toBe(null)
  })
})
