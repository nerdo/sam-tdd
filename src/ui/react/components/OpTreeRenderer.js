import React, { useCallback } from 'react'
import { traverse } from '../../../sam/functions'
import { TemperatureEditor } from './TemperatureEditor'

export function OpTreeRenderer (props) {
  const { opTree } = props

  let reactComponents = []
  traverse(
    opTree,
    (path, op) => { reactComponents.push(renderOp(op, path)) }
  )

  function renderOp (op, path) {
    return (
      <TemperatureEditor
        key={path.join('.')}
        value={op.getValue()}
        units={op.getUnits()}
        onValueChange={useCallback(value => op.setValue({ value }), path)}
        onUnitsChange={useCallback(units => op.setUnits({ units }), path)}
      />
    )
  }

  return (
    <React.Fragment>
      {reactComponents}
    </React.Fragment>
  )
}
