import Immutable from 'seamless-immutable'
// import { ViewModelRenderer } from './components'

export class ViewModelPresenter {
  constructor () {
    this.viewModel = {}
  }

  getRepresentation (model) {
    // TODO need an interface to do this well...
    const m = model
    const updatedViewModel = {
      air: {
        value: m.opTree.air.getValue(),
        units: m.opTree.air.getUnits(),
        intentions: {
          setValue: m.opTree.air.setValue,
          setUnits: m.opTree.air.setUnits
        }
      },
      water: {
        value: m.opTree.water.getValue(),
        units: m.opTree.water.getUnits(),
        intentions: {
          setValue: m.opTree.water.setValue,
          setUnits: m.opTree.water.setUnits
        }
      }
    }

    const newViewModel = Immutable.merge(this.viewModel, updatedViewModel, { deep: true })
    console.log('newViewModel === this.viewModel', newViewModel === this.viewModel)
    this.viewModel = newViewModel
    return this.viewModel
  }


  render (viewModel) {
    // ReactDOM.render(<ViewModelRenderer vm={viewModel} />, document.getElementById('app'))
  }
}
