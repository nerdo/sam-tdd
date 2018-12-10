import React, { useCallback } from 'react'
import { workLeafNodes } from 'alma'
import { TemperatureEditor } from './TemperatureEditor'

export function OpTreeRenderer (props) {
  const { opTree } = props

  let reactComponents = []
  workLeafNodes(
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
      <h2>react OpTreeRenderer</h2>
      {reactComponents}
    </React.Fragment>
  )
}
