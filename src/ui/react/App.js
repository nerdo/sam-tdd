import React from 'react'
import { traverse } from '../../sam/functions'
import { TemperatureEditor } from './TemperatureEditor'

export function App (props) {
  const { model } = props

  let reactComponents = []
  traverse(
    model.opTree,
    (path, op) => {
      reactComponents.push(renderOp(op, path))
    }
  )

  function renderOp (op, path) {
    return (
      <TemperatureEditor
        key={path.join('.')}
        value={op.getValue()}
        units={op.getUnits()}
        onValueChange={value => op.setValue({ value })}
        onUnitsChange={units => op.setUnits({ units })}
      />
    )
  }

  return (
    <React.Fragment>
      {reactComponents}
    </React.Fragment>
  )
}
