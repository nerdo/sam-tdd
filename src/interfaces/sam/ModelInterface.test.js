/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Model } from '../../sam'
import { ModelInterface } from './'

setupCustomMatchers(expect)

const newModel = () => new Model()

describe('ModelInterface conformance', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Model'}               | ${newModel}
  `('$concreteImplementationName', ({ newInstance }) => {
      const model = newInstance()
      expect(model).toImplement(ModelInterface)

      expect(() => model.setSupervisor(null)).not.toThrow()
      expect(model.getSupervisor()).toBe(null)
    })
})
