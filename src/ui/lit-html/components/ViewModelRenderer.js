import { html } from 'lit-html'
import { TemperatureEditor } from './TemperatureEditor'

export const ViewModelRenderer = (props) => {
  const { vm } = props

  return html`
    <h2>lit-html ViewModelRenderer</h2>
    ${TemperatureEditor({
      value: vm.air.value,
      units: vm.air.units,
      onValueChange: value => vm.air.intentions.setValue({ value }),
      onUnitsChange: units => vm.air.intentions.setUnits({ units })
    })}
    ${TemperatureEditor({
      value: vm.water.value,
      units: vm.water.units,
      onValueChange: value => vm.water.intentions.setValue({ value }),
      onUnitsChange: units => vm.water.intentions.setUnits({ units })
    })}
  `
}
