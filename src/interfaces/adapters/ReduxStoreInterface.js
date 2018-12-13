import $$observable from 'symbol-observable'

export class ReduxStoreInterface {
  dispatch (action) { throw new Error('Not Yet Implemented') }

  subscribe (listener) { throw new Error('Not Yet Implemented') }

  getState () { throw new Error('Not Yet Implemented') }

  // [$$observable] () { throw new Error('Not Yet Implemented') }
}
