/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Actions, Model } from '../../sam'
import { ActionsInterface, ModelInterface } from './'

setupCustomMatchers(expect)

const newActions = () => new Actions()

describe('ActionsInterface conformance', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Actions'}               | ${newActions}
  `('$concreteImplementationName', ({ newInstance }) => {
      const model = new Model()

      const actions = newInstance()
      expect(actions).toImplement(ActionsInterface)

      expect(() => actions.setModel(model)).not.toThrow()
      const receivedModel = actions.getModel()
      expect(receivedModel).toBe(model)
      expect(receivedModel).toImplement(ModelInterface)
    })
})
