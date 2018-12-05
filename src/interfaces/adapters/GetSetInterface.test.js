/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { GetSetInterface } from '.'
import { ImmutableGetSet } from '../../adapters/ImmutableGetSet'
import { MutableGetSet } from '../../adapters/MutableGetSet'

setupCustomMatchers(expect)

describe('GetSetInterface', () => {
  describe.each`
    concreteImplementationName | newInstance
    ${'MutableGetSet'}         | ${() => new MutableGetSet()}
    ${'ImmutableGetSet'}       | ${() => new ImmutableGetSet()}
  `('$concreteImplementationName', ({newInstance}) => {
    test('implementing GetSetInterface', () => {
      const result = newInstance()

      expect(result).toBeDefined()
      expect(result).toImplement(GetSetInterface)
    })

    describe('get', () => {
      test('the entire object with no path', () => {
        const obj = {
          foo: {
            bar: 1,
            a: 2,
            3: {
              hello: 'world'
            }
          }
        }
        const gs = newInstance()

        const result = gs.get(obj)

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

      test('a value on an object path that exists', () => {
        const obj = {
          foo: {
            bar: 1,
            a: 2,
            3: {
              hello: 'world'
            }
          }
        }
        const gs = newInstance()

        const result = gs.get(obj, ['foo', 3, 'hello'])

        expect(result).toMatch('world')
      })

      test('a value on an object path that does not exist', () => {
        const obj = {
          foo: { }
        }
        const gs = newInstance()

        const result = gs.get(obj, ['foo', 3, 'hello'], 'default value')

        expect(result).toMatch('default value')
      })
    })

    describe('set', () => {
      test('the entire object with no path', () => {
        const obj = {
          foo: {
            bar: 1,
            a: 2,
            3: {
              hello: 'world'
            }
          }
        }
        const gs = newInstance()

        const result = gs.set(obj, void 0, { replacement: true })

        expect(result).toEqual({ replacement: true })
      })

      test('a value on an object path that already exists', () => {
        const obj = {
          foo: {
            bar: 1,
            a: 2,
            3: {
              hello: 'world'
            }
          }
        }
        const gs = newInstance()

        const result = gs.set(obj, ['foo', 3, 'hello'], 'set')

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

      test('a value on an object path that does not exist', () => {
        const obj = {
          foo: {}
        }
        const gs = newInstance()

        const result = gs.set(obj, ['foo', 3, 'hello'], 'set')

        expect(result).toEqual({
          foo: {
            3: {
              hello: 'set'
            }
          }
        })
      })
    })
  })
})
