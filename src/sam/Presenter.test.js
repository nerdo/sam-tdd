/* global describe, test, expect */
import { Presenter } from './Presenter'
import { PresenterInterface } from '../interfaces/sam'
import { setupCustomMatchers } from '../helpers/jest'

setupCustomMatchers(expect)

describe('Presenter', () => {
  test('implements PresenterInterface', () => {
    const supervisor = new Presenter()
    expect(supervisor).toImplement(PresenterInterface)
  })
})
