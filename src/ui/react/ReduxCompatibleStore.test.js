/* global describe, test, expect */
import { setupCustomMatchers } from '../../helpers/jest'
import { ReduxCompatibleStore } from './ReduxCompatibleStore';
import { ReduxStoreInterface } from '../../interfaces/adapters/ReduxStoreInterface';

setupCustomMatchers(expect)

describe('ReduxCompatibleStore', () => {
  describe('conforming to a Redux store', () => {
    test('implementing the ReduxStoreInterface interface', () => {
      const store = new ReduxCompatibleStore()
      expect(store).toImplement(ReduxStoreInterface)
    })

    test('subscribing to the store', () => {
      const store = new ReduxCompatibleStore()

      const listener1 = jest.fn()
      const listener2 = jest.fn()

      const unsubscriber1 = store.subscribe(listener1)
      const unsubscriber2 = store.subscribe(listener2)

      store.dispatch({})
      unsubscriber1()
      store.dispatch({})

      expect(listener1).toHaveBeenCalledTimes(1)
      expect(listener2).toHaveBeenCalledTimes(2)
      expect(unsubscriber1).not.toThrow()
    })

    test('dispatching to the store', () => {
      const store = new ReduxCompatibleStore()
      const action = {}

      const result = store.dispatch(action)

      expect(result).toBe(action)
    })
  })

  test('setting and retrieving state', () => {
    const store = new ReduxCompatibleStore()
    const state = {
      hello: 1,
      world: {
        foo: [1, 2, 3],
        bar: false
      }
    }
    store.dispatch = jest.fn()

    store.setState(state)
    const result = store.getState()

    expect(result).toBe(state)
    expect(store.dispatch).toBeCalledTimes(1)
  })
})
