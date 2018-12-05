/* global describe, test, expect */
import { Model } from './Model'
import { ModelInterface } from '../interfaces/sam'
import { setupCustomMatchers } from '../helpers/jest'

setupCustomMatchers(expect)

describe('Model', () => {
  test('implements ModelInterface', () => {
    const supervisor = new Model()
    expect(supervisor).toImplement(ModelInterface)
  })
})
