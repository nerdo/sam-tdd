/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { Presenter } from '../../sam'
import { PresenterInterface } from './'

setupCustomMatchers(expect)

const newPresenter = () => new Presenter()

describe('PresenterInterface conformance', () => {
  test.each`
    concreteImplementationName | newInstance
    ${'Presenter'}               | ${newPresenter}
  `('$concreteImplementationName', ({ newInstance }) => {
      const presenter = newInstance()
      expect(presenter).toImplement(PresenterInterface)

      expect(() => presenter.render({})).not.toThrow()
    })
})
