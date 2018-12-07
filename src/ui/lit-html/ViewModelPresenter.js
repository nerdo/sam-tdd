import { ViewModelRenderer } from './components'
import { render } from 'lit-html'

export class ViewModelPresenter {
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

    console.log('updatedViewModel', updatedViewModel)
    return updatedViewModel
  }

  render (vm) {
    render(ViewModelRenderer({ vm }), document.getElementById('app'))
  }
}
