/* global describe, test, expect */
import { Engine } from './Engine'
import { EngineInterface } from '../interfaces/sam'
import { setupCustomMatchers } from '../helpers/jest'

setupCustomMatchers(expect)

describe('Engine', () => {
  test('implements EngineInterface', () => {
    const supervisor = new Engine()
    expect(supervisor).toImplement(EngineInterface)
  })
})
