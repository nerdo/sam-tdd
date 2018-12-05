/* global describe, test, expect */
import { Presenter } from './Presenter'

describe('Presenter', () => {
  test('instantiation', () => {
    const result = new Presenter()
    expect(result).toBeDefined()
  })
})
