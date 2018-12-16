/* global describe, test, expect */
import { arraysAreEqual } from './arraysAreEqual'

describe('arraysAreEqual', () => {
  test('undefined arrays', () => {
    expect(arraysAreEqual(void 0, void 0)).toBe(true)
  })

  test('an undefined array and anything else', () => {
    expect(arraysAreEqual(void 0, [])).toBe(false)
    expect(arraysAreEqual([], void 0)).toBe(false)
    expect(arraysAreEqual(void 0, 'hello')).toBe(false)
    expect(arraysAreEqual('hello', void 0)).toBe(false)
  })

  test('arrays', () => {
    expect(arraysAreEqual([], [])).toBe(true)
    expect(arraysAreEqual([void 0, 1, 'two'], [void 0, 1, 'two'])).toBe(true)
    expect(arraysAreEqual([new Object], [new Object])).toBe(false)

    const sameObject = {}
    expect(arraysAreEqual([sameObject], [sameObject])).toBe(true)

    expect(arraysAreEqual([1], [1, 2])).toBe(false)
  })
})
