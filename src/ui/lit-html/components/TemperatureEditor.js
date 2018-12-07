import { html } from 'lit-html'
import { Something } from './Something';

export const TemperatureEditor = (props) => {
  const { value = '', units = '' } = props

  function valueChange (e) {
    if (props.onValueChange) {
      props.onValueChange(e.target.value)
    }
  }

  function unitsChange (e) {
    if (props.onUnitsChange) {
      props.onUnitsChange(e.target.value)
    }
  }

  return html`
    <div>
      Temperature: <input type="text" value=${value} @keypress=${valueChange} />
      ${Something}
      Units (input): <input type="text" value=${units} @keypress=${unitsChange} />
      Units (selection):
      <select value=${units} @change=${unitsChange}>
        <optgroup label="Valid Units">
          <option value="C">Celcius</option>
          <option value="F">Farenheit</option>
          <option value="K">Kelvin</option>
        </optgroup>
        <optgroup label="Fake Units">
          <option value="I">Imaginary</option>
        </optgroup>
      </select>
    </div>
  `
}
