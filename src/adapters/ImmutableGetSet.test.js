/* global describe, test, expect */
import { setupCustomMatchers } from '../helpers/jest'
import { GetSetInterface } from '../interfaces/adapters'
import { ImmutableGetSet } from './ImmutableGetSet'

setupCustomMatchers(expect)

describe('ImmutableGetSet', () => {
  describe('get', () => {
    test('an immutable copy of the entire object', () => {
      const obj = {
        foo: {
          bar: 1,
          a: 2,
          3: {
            hello: 'world'
          }
        }
      }

      const gs = new ImmutableGetSet()

      const result = gs.get(obj)
      try { result.bar = 5 } catch { }

      expect(result).not.toBe(obj)
      expect(result).toEqual({
        foo: {
          bar: 1,
          a: 2,
          3: {
            hello: 'world'
          }
        }
      })
    })

    test('an immutable part of the object', () => {
      const obj = {
        foo: {
          bar: 1,
          a: 2,
          3: {
            hello: 'world'
          }
        }
      }

      const gs = new ImmutableGetSet()
      let result = gs.get(obj, ['foo'])
      try { result.bar = 5 } catch { }

      expect(result).toEqual({
        bar: 1,
        a: 2,
        3: {
          hello: 'world'
        }
      })
    })
  })

  describe('set', () => {
    test('a value on an object', () => {
      const obj = {
        foo: {
          bar: 1,
          a: 2,
          3: {
            hello: 'world'
          }
        }
      }

      const gs = new ImmutableGetSet()

      const result = gs.set(obj, ['foo', 3, 'hello'], 'set')

      expect(result).not.toBe(obj)
      expect(result).toEqual({
        foo: {
          bar: 1,
          a: 2,
          3: {
            hello: 'set'
          }
        }
      })
    })
  })
})
