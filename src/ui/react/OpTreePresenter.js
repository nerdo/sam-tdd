import React from 'react'
import ReactDOM from 'react-dom'
import { OpTreeRenderer } from './components'

export class OpTreePresenter {
  getRepresentation (model) {
    // This is not recommended, because, at the very least, the top-level component depends on the model structure.
    return model.getOpTree()
  }

  render (opTree) {
    ReactDOM.render(<OpTreeRenderer opTree={opTree} />, document.getElementById('app'))
  }
}
