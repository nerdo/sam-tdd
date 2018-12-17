import React, { useCallback } from 'react'
import { TemperatureEditor } from './TemperatureEditor'
import { List } from './List'

export const ViewModelRenderer = React.memo((props) => {
  const {
    air = {},
    water = {},
    list = {}
  } = props

  return (
    <React.Fragment>
      <h2>react ViewModelRenderer</h2>
      <TemperatureEditor
        key='air'
        value={air.value}
        units={air.units}
        onValueChange={useCallback(value => air.intentions.setValue({ value }), ['air'])}
        onUnitsChange={useCallback(units => air.intentions.setUnits({ units }), ['air'])}
      />
      <TemperatureEditor
        key='water'
        value={water.value}
        units={water.units}
        onValueChange={useCallback(value => water.intentions.setValue({ value }), ['water'])}
        onUnitsChange={useCallback(units => water.intentions.setUnits({ units }), ['water'])}
      />
      <List
        key='list'
        order={list.order}
        path={['list']}
        onAddTemperature={useCallback(index => list.intentions.addTemperature(index), ['list'])}
        onMoveItem={useCallback((fromIndex, toIndex) => list.intentions.moveItem(fromIndex, toIndex), ['list'])}
      />
    </React.Fragment>
  )
})
