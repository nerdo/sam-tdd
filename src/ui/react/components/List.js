import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { TemperatureEditor } from './TemperatureEditor'
import { arraysAreEqual } from '../../../helpers/arraysAreEqual'
import { NormalMutator } from 'alma';
import { memoized } from '../../../helpers/memoized'
import { Button } from './Button'

const mutator = new NormalMutator()
const intentions = new WeakMap()

const Item = React.memo(
  (props) => {
    console.log('Rendering Item', props)
    const {
      id,
      children
    } = props

    return (
      <div className='item'>
        <div>ID: {id}</div>
        <div className='children'>
          {children}
        </div>
        <div className='controls'>
          <Button onClick={props.onAddAfter}>Add</Button>
          <Button onClick={props.onMoveDown}>Down</Button>
          <Button onClick={props.onMoveUp}>Up</Button>
        </div>
      </div>
    )
  }
)

const TemperatureItem = React.memo(
  (props) => {
    console.log('Rendering TemperatureItem', props)

    const { data: temperature } = props
    if (!intentions.get(temperature.intentions.setValue)) {
      intentions.set(
        temperature.intentions.setValue,
        {
          setValue: (value) => temperature.intentions.setValue({ value }),
          setUnits: (units) => temperature.intentions.setUnits({ units })
        }
      )
    }
    return (
      <TemperatureEditor
        value={temperature.value}
        units={temperature.units}
        onValueChange={intentions.get(temperature.intentions.setValue).setValue}
        onUnitsChange={intentions.get(temperature.intentions.setValue).setUnits}
      />
    )
  },
  (prevProps, nextProps) => {
    return prevProps.data.value === nextProps.data.value
      && prevProps.data.units === nextProps.data.units
  }
)

const [temperatureComponent] = memoized(
  function (item) {
    console.log('Returning new component', item)
    return <TemperatureItem {...item} />
  },
  function ([{ id, data } = {}]) {
    return [id, data.value, data.units]
  }
)

const mapStateToProps = (state, props) => {
  const {
    path
  } = props

  const item = mutator.get(state, path, {})

  let children

  if (item.type === 'Temperature') {
    children = temperatureComponent(item)
  }

  return {
    children
  }
}

const ReduxItem = connect(mapStateToProps)(Item)

export const List = React.memo(
  (props) => {
    console.log('List rendering', props)
    const { order, path } = props
    const components = (order || [])
      .map((id, index) => {
        return (
          <ReduxItem
            id={id}
            key={id}
            path={path.concat('items', id)}
            onAddAfter={() => addTemperatureItem(index + 1)}
            onMoveUp={() => moveItem(index, index - 1)}
            onMoveDown={() => moveItem(index, index + 1)}
            // onMoveUp={!isFirst ? () => moveItem(index, index - 1) : void 0}
            // onMoveDown={!isLast ? () => moveItem(index, index + 1) : void 0}
          />
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
      <div className='list'>
        <h4>List</h4>
        <Button onClick={() => addTemperatureItem()}>Add</Button>
        {components}
      </div>
    )
  },
  (prevProps, nextProps) => {
    return arraysAreEqual(prevProps.order, nextProps.order)
      && arraysAreEqual(prevProps.path, nextProps.path)
  }
)
