import { html } from 'lit-html'
import { Something } from './Something';

export const TemperatureEditor = (props) => {
  const { value = '', units = '' } = props
  let wasKeyPressed = false

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

  function keyPressed () {
    wasKeyPressed = true
  }

  function ifPressed (e, fn) {
    if (!wasKeyPressed) {
      return
    }
    keyPressed = false
    return fn(e)
  }

  return html`
    <div>
      Temperature: <input type="text" .value=${value} @keypress=${keyPressed} @keyup=${e => ifPressed(e, valueChange)} />
      ${Something}
      Units (input): <input type="text" .value=${units} @keypress=${keyPressed} @keyup=${e => ifPressed(e, unitsChange)} />
      Units (selection):
      <select @change=${unitsChange}>
        <optgroup label="Valid Units">
          <option value="C" ?selected=${units === 'C'}>Celcius</option>
          <option value="F" ?selected=${units === 'F'}>Farenheit</option>
          <option value="K" ?selected=${units === 'K'}>Kelvin</option>
        </optgroup>
        <optgroup label="Fake Units">
          <option value="I" ?selected=${units === 'I'}>Imaginary</option>
        </optgroup>
      </select>
    </div>
  `
}
