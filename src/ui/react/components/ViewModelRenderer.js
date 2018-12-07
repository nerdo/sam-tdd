import React, { useCallback } from 'react'
import { TemperatureEditor } from './TemperatureEditor'

export const ViewModelRenderer = React.memo((props) => {
  const { vm } = props

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
})
