/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Supervisor } from '../../sam'
import { SupervisorInterface } from './'

setupCustomMatchers(expect)

const newSupervisor = () => new Supervisor()

describe('SupervisorInterface conformance of', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Supervisor'}               | ${newSupervisor}
  `('$concreteImplementationName', ({ newInstance }) => {
      const supervisor = newInstance()
      expect(supervisor).toImplement(SupervisorInterface)

      expect(() => supervisor.setPresenter(null)).not.toThrow()
      expect(supervisor.getPresenter()).toBe(null)
    })
})
