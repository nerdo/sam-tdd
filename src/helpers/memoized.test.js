/* global describe, expect, test */
import { memoized } from './memoized'

describe('memoized', () => {
  test('default arg mapper', () => {
    const [creator] = memoized(() => ({}))
    const a = creator('joe')
    const b = creator('joe')
    const c = creator('dude')
    expect(a).toBe(b)
    expect(a).not.toBe(c)
  })

  test('custom arg mapper', () => {
    const argMapper = function ( [value, , label] ) {
      return [value, label]
    }
    const [creator] = memoized(() => ({}), argMapper)
    const a = creator('joe', 5, 'lewis')
    const b = creator('joe', 6, 'lewis')
    const c = creator('joe')
    expect(a).toBe(b)
    expect(a).not.toBe(c)
  })

  test('removing values', () => {
    const [creator, remove] = memoized(() => ({}))
    const a = creator('joe')
    remove(a)
    const b = creator('joe')
    expect(a).not.toBe(b)
  })
})
