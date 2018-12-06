/* global describe, test, expect */
import { traverse } from './traverse'

describe('traverse', () => {
  test('an undefined tree', () => {
    const fn = jest.fn()

    traverse(void 0, fn)

    expect(fn).not.toHaveBeenCalled()
  })

  test('an empty tree', () => {
    const fn = jest.fn()

    traverse({}, fn)

    expect(fn).not.toHaveBeenCalled()
  })

  test('a flat tree', () => {
    const fn = jest.fn()

    traverse({a: 1, b: 2, c: 3}, fn)

    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('a generic tree', () => {
    const fn = jest.fn()

    const NotPlainObject = class {
      constructor() {
        this.something = 1
        this.other = 2
        this.that = 3
        this.another = 4
      }
    }

    const tree = {
      a: 1, // yes
      b: false, // yes
      c: true, // yes
      foo: {
        x: 'hi', // yes
        [Symbol.for('something')]: () => true, // yes
        ok: false // yes
      },
      bar: {
        justice: {
          served: 3, // yes
          symbol: Symbol.for('something else') // yes
        },
        hello: {
          1: [0, 1, 2], // yes
          kitty: {} // yes
        }
      },
      d: 'hello', // yes
      notPlainObject: new NotPlainObject() // yes
    }

    traverse(tree, fn)

    expect(fn).toHaveBeenCalledTimes(11)

    // TODO check fn.mock.calls//?
  })
})
