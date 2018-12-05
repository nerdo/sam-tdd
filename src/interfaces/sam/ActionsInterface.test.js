/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Actions } from '../../sam'
import { ActionsInterface } from './'

setupCustomMatchers(expect)

const newActions = () => new Actions()

describe('ActionsInterface conformance', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Actions'}               | ${newActions}
  `('$concreteImplementationName', ({ newInstance }) => {
      const actions = newInstance()
      expect(actions).toImplement(ActionsInterface)

      expect(() => actions.setModel(null)).not.toThrow()
      expect(actions.getModel()).toBe(null)
    })
})
