/* global describe, test, expect */
import { ImmutableMutator } from './ImmutableMutator'

describe('ImmutableMutator', () => {
  // TODO use conformance test from alma here

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

      const gs = new ImmutableMutator()

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

      const gs = new ImmutableMutator()
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

      const gs = new ImmutableMutator()

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
