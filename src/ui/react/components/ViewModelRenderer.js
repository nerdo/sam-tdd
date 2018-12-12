import React, { useCallback } from 'react'
import { TemperatureEditor } from './TemperatureEditor'
import { List } from './List'

export const ViewModelRenderer = React.memo((props) => {
  const { vm } = props

  return (
    <React.Fragment>
      <h2>react ViewModelRenderer</h2>
      <TemperatureEditor
        key="air"
        value={vm.air.value}
        units={vm.air.units}
        onValueChange={useCallback(value => vm.air.intentions.setValue({ value }), ['air'])}
        onUnitsChange={useCallback(units => vm.air.intentions.setUnits({ units }), ['air'])}
      />
      <TemperatureEditor
        key="water"
        value={vm.water.value}
        units={vm.water.units}
        onValueChange={useCallback(value => vm.water.intentions.setValue({ value }), ['water'])}
        onUnitsChange={useCallback(units => vm.water.intentions.setUnits({ units }), ['water'])}
      />
      <List
        key="list"
        order={vm.list.order}
        items={vm.list.items}
        onAddTemperature={useCallback(index => vm.list.intentions.addTemperature(index), ['list'])}
        onMoveItem={useCallback((fromIndex, toIndex) => vm.list.intentions.moveItem(fromIndex, toIndex), ['list'])}
      />
    </React.Fragment>
  )
})
