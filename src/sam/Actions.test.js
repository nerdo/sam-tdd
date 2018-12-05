/* global describe, test, expect */
import { Actions } from './Actions'

describe('Actions', () => {
  test('instantiation', () => {
    const result = new Actions()
    expect(result).toBeDefined()
  })
})
