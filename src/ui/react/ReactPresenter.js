import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { traverse } from '../../sam/functions';
import { TemperatureEditor } from './TemperatureEditor';

export class ReactPresenter {
  getRepresentation (model) {
    // TODO need an interface to do this well...
    return model
    // console.log(model.opTree.air)
    // return this.temperature(model)
  }

  render (representation) {
    // this.state = representation
    let reactComponents = []
    traverse(
      representation.opTree,
      (path, op) => {
        reactComponents.push(this.renderOp(op))
      }
    )

    let output = (
      <React.Fragment>
        {reactComponents}
      </React.Fragment>
    )
    ReactDOM.render(output, document.getElementById('app'))
  }

  // temperature (model) {
  //   return model.data
  // }
  renderOp (op) {
    return (
      <TemperatureEditor
        key="1"
        value={op.getValue()}
        units={op.getUnits()}
        onValueChange={value => op.setValue({ value })}
        onUnitsChange={units => op.setUnits({ units })}
      />
    )
  }
}
