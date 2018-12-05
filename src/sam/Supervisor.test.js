/* global describe, test, expect */
import { Supervisor } from './Supervisor'
import { SupervisorInterface } from '../interfaces/sam'
import { setupCustomMatchers } from '../helpers/jest'

setupCustomMatchers(expect)

describe('Supervisor', () => {
  test('implements SupervisorInterface', () => {
    const supervisor = new Supervisor()
    expect(supervisor).toImplement(SupervisorInterface)
  })
})
