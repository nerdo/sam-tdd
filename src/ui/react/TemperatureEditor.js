import React from 'react'
import { Something } from './Something';

export function TemperatureEditor (props) {
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

  return (
    <div>
      Temperature: <input type="text" value={value} onChange={valueChange} />
      <Something />
      Units: <input type="text" value={units} onChange={unitsChange} />
    </div>
  )
}
