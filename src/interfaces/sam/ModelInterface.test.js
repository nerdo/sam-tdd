/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Model, Supervisor } from '../../sam'
import { ModelInterface, SupervisorInterface } from './'

setupCustomMatchers(expect)

const newModel = () => new Model()

describe('ModelInterface conformance', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Model'}               | ${newModel}
  `('$concreteImplementationName', ({ newInstance }) => {
      const supervisor = new Supervisor()

      const model = newInstance()
      expect(model).toImplement(ModelInterface)

      expect(() => model.setSupervisor(supervisor)).not.toThrow()
      const receivedSupervisor = model.getSupervisor()
      expect(receivedSupervisor).toBe(supervisor)
      expect(receivedSupervisor).toImplement(SupervisorInterface)
    })
})
