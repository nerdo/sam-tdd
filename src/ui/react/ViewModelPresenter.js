import Immutable from 'seamless-immutable'
import mergers from 'seamless-immutable-mergers'
import React from 'react'
import ReactDOM from 'react-dom'
import { ViewModelRenderer } from './components/ViewModelRenderer'
import { Temperature } from '../../operators/Temperature'
import { List } from 'alma/dist/ops'

const EMPTY_OBJECT = {}

export class ViewModelPresenter {
  constructor () {
    this.viewModel = { }
    this.intentions = new WeakMap()
  }

  getRepresentation (model) {
    // If something changes in the model structure, this should be the *only* place that needs modification
    // if we map what we need into our own view model...
    const opTree = model.getOpTree()
    const updatedViewModel = Immutable.merge(
      this.viewModel,
      {
        air: this.temperatureVM(opTree.air),
        water: this.temperatureVM(opTree.water),
        list: this.listVM(opTree.list)
      },
      { deep: true, merger: mergers.equalityArrayMerger }
    )

    console.log(updatedViewModel === this.viewModel)

    this.viewModel = updatedViewModel

    return this.viewModel
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
    return this.viewModel
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

  render (viewModel) {
    ReactDOM.render(<ViewModelRenderer vm={viewModel} />, document.getElementById('app'))
  }
}
