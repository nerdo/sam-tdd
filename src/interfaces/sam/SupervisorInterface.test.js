/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Supervisor, Presenter } from '../../sam'
import { SupervisorInterface, PresenterInterface } from './'

setupCustomMatchers(expect)

const newSupervisor = () => new Supervisor()

describe('SupervisorInterface conformance', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Supervisor'}               | ${newSupervisor}
  `('$concreteImplementationName', ({ newInstance }) => {
      const presenter = new Presenter()

      const supervisor = newInstance()
      expect(supervisor).toImplement(SupervisorInterface)

      expect(() => supervisor.setPresenter(presenter)).not.toThrow()
      const receivedPresenter = supervisor.getPresenter()
      expect(receivedPresenter).toBe(presenter)
      expect(receivedPresenter).toImplement(PresenterInterface)
    })
})
