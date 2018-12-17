import Immutable from 'seamless-immutable'
import mergers from 'seamless-immutable-mergers'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedViewModelRenderer } from './components/ConnectedViewModelRenderer'
import { Temperature } from '../../operators/Temperature'
import { List } from 'alma/dist/ops'
import { ReduxCompatibleStore } from './ReduxCompatibleStore'

export class ViewModelPresenter {
  constructor () {
    this.intentions = new WeakMap()
    this.store = new ReduxCompatibleStore()
    this.store.setState({})

    const tree = (
      <Provider store={this.store}>
        <ConnectedViewModelRenderer />
      </Provider>
    )
    ReactDOM.render(tree, document.getElementById('app'))
  }

  getRepresentation (model) {
    // If something changes in the model structure, this should be the *only* place that needs modification
    // if we map what we need into our own view model...
    const opTree = model.getOpTree()
    return Immutable.merge(
      this.store.getState(),
      {
        air: this.temperatureVM(opTree.air),
        water: this.temperatureVM(opTree.water),
        list: this.listVM(opTree.list)
      },
      { deep: true, merger: mergers.equalityArrayMerger }
    )
  }

  temperatureVM (temperature) {
    return {
      value: temperature.getValue(),
      units: temperature.getUnits(),
      intentions: {
        setValue: temperature.setValue,
        setUnits: temperature.setUnits
      }
    }
  }

  listVM (list) {
    if (!this.intentions.get(list)) {
      this.intentions.set(
        list,
        {
          addTemperature: (index = List.END) => list.addItems(index, [new Temperature()], true),
          moveItem: (fromIndex, toIndex) => {
            const id = list.getOrder()[fromIndex]
            const op = list.getItemById(id)
            if (!op) { return }
            list.moveItems([op], toIndex)
          }
        }
      )
    }

    return {
      order: list.getOrder(),
      items: list.getOrder()
        .map(id => {
          return { id, op: list.getItemById(id) }
        })
        .filter(item => item.op)
        .reduce(
          (result, item) => {
            if (item.op instanceof Temperature) {
              result[item.id] = {
                id: item.id,
                type: 'Temperature',
                data: this.temperatureVM(item.op)
              }
            }
            return result
          },
          {}
        ),
      intentions: this.intentions.get(list)
    }
  }

  render (updatedViewModel) {
    this.store.setState(updatedViewModel)
  }
}
