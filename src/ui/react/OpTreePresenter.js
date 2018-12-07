import React from 'react'
import ReactDOM from 'react-dom'
import { OpTreeRenderer } from './components'

export class OpTreePresenter {
  getRepresentation (model) {
    // TODO need an interface to do this well...
    return model.opTree
  }

  render (opTree) {
    ReactDOM.render(<OpTreeRenderer opTree={opTree} />, document.getElementById('app'))
  }
}
