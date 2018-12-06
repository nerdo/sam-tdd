import React from 'react'

export function TemperatureEditor (props) {
  const { value, units } = props

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
      Units: <input type="text" value={units} onChange={unitsChange} />
    </div>
  )
}
