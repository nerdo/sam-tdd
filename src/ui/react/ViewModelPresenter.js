import Immutable from 'seamless-immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { ViewModelRenderer } from './components'

export class ViewModelPresenter {
  constructor () {
    this.viewModel = {}
  }

  getRepresentation (model) {
    // If something changes in the model structure, this should be the *only* place that needs modification
    // if we map what we need into our own view model...
    const opTree = model.getOpTree()
    const updatedViewModel = {
      air: {
        value: opTree.air.getValue(),
        units: opTree.air.getUnits(),
        intentions: {
          setValue: opTree.air.setValue,
          setUnits: opTree.air.setUnits
        }
      },
      water: {
        value: opTree.water.getValue(),
        units: opTree.water.getUnits(),
        intentions: {
          setValue: opTree.water.setValue,
          setUnits: opTree.water.setUnits
        }
      }
    }

    const newViewModel = Immutable.merge(this.viewModel, updatedViewModel, { deep: true })
    console.log('newViewModel === this.viewModel', newViewModel === this.viewModel)
    this.viewModel = newViewModel
    return this.viewModel
  }


  render (viewModel) {
    ReactDOM.render(<ViewModelRenderer vm={viewModel} />, document.getElementById('app'))
  }
}
