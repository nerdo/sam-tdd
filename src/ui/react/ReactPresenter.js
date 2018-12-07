import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

export class ReactPresenter {
  getRepresentation (model) {
    // TODO need an interface to do this well...
    return model
    // console.log(model.opTree.air)
    // return this.temperature(model)
  }

  render (representation) {
    ReactDOM.render(<App model={representation} />, document.getElementById('app'))
  }
}
