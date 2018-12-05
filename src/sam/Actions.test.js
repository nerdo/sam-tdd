/* global describe, test, expect */
import { Actions } from './Actions'
import { ActionsInterface } from '../interfaces/sam'
import { setupCustomMatchers } from '../helpers/jest'

setupCustomMatchers(expect)

describe('Actions', () => {
  test('implements ActionsInterface', () => {
    const supervisor = new Actions()
    expect(supervisor).toImplement(ActionsInterface)
  })
})
