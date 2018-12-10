import React, { useCallback } from 'react'
import { TemperatureEditor } from './TemperatureEditor'

export const List = React.memo(({ order, items }) => {
  const components = order
    .map(id => items[id])
    .filter(item => item)
    .map(item => {
      if (item.type === 'Temperature' && item.id) {
        const { data: temperature } = item
        return (
          <TemperatureEditor
            key={item.id}
            value={temperature.value}
            units={temperature.units}
            onValueChange={useCallback(value => temperature.intentions.setValue({ value }), [temperature.id])}
            onUnitsChange={useCallback(units => temperature.intentions.setUnits({ units }), [temperature.id])}
          />
        )
      }
    })

  return (
    <div>
      <h4>List</h4>
      {components}
    </div>
  )
})
