import React, { useCallback } from 'react'
import { TemperatureEditor } from './TemperatureEditor'

const Item = React.memo((props) => {
  const {
    id,
    children
  } = props
  return (
    <div className="item">
      <div>ID: {id}</div>
      <div className="children">
        {children}
      </div>
      <div className="controls">
        <Button onClick={props.onAddAfter}>Add</Button>
        <Button onClick={props.onMoveDown}>Down</Button>
        <Button onClick={props.onMoveUp}>Up</Button>
      </div>
    </div>
  )
})

const Button = React.memo((props) => {
  const { onClick, children } = props

  let button

  if (onClick) {
    button = <button onClick={onClick}>{children}</button>
  } else {
    button = <button disabled={true}>{children}</button>
  }

  return button
})

const intentions = new WeakMap()

export const List = React.memo((props) => {
  const { order, items } = props
  const components = (order || [])
    .map((id, index) => ({ item: items[id], index }))
    .map((current, index) => {
      let component
      if (typeof current.item !== 'undefined' && current.item.type === 'Temperature' && current.item.id) {
        const { data: temperature } = current.item
        if (!intentions.get(temperature.intentions.setValue)) {
          intentions.set(
            temperature.intentions.setValue,
            {
              setValue: (value) => temperature.intentions.setValue({ value }),
              setUnits: (units) => temperature.intentions.setUnits({ units })
            }
          )
        }
        component = (
          <TemperatureEditor
            value={temperature.value}
            units={temperature.units}
            onValueChange={intentions.get(temperature.intentions.setValue).setValue}
            onUnitsChange={intentions.get(temperature.intentions.setValue).setUnits}
          />
        )
      }
      return { ...current, component }
    })
    .filter(({ component }) => component)
    .reduce(
      (result, current) => {
        let isFirst = false, isLast = false
        if (result.length === 0) {
          isFirst = true
          isLast = true
        }

        isLast = true
        if (result.length) {
          result[result.length - 1].isLast = false
        }

        result.push({ ...current, isFirst, isLast })
        return result
      },
      []
    )
    .map(({ item, index, isFirst, isLast, component }) => {
      return (
        <Item
          id={item.id}
          key={item.id}
          onAddAfter={() => addTemperatureItem(index + 1)}
          onMoveUp={!isFirst ? () => moveItem(index, index - 1) : void 0}
          onMoveDown={!isLast ? () => moveItem(index, index + 1) : void 0}
        >
          {component}
        </Item>
      )
    })

  function addTemperatureItem (index) {
    if (props.onAddTemperature) {
      props.onAddTemperature(index)
    }
  }

  function moveItem (fromIndex, toIndex) {
    if (props.onMoveItem) {
      props.onMoveItem(fromIndex, toIndex)
    }
  }

  return (
    <div className="list">
      <h4>List</h4>
      <Button onClick={() => addTemperatureItem()}>Add</Button>
      {components}
    </div>
  )
})
