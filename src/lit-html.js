import { Engine } from 'alma'
import { Temperature } from './operators/Temperature'
import { ViewModelPresenter } from './ui/lit-html/ViewModelPresenter'
import { List } from 'alma/dist/ops'

const newEngine = function (opTree, data) {
  const engine = new Engine(new ViewModelPresenter())
  const model = engine.getModel()
  model.set([], data)
  model.setOpTree(opTree)
  return engine
}

const air = new Temperature()
const water = new Temperature()
const list = new List()
const engine = newEngine({ air, water, list })

engine.reset()
engine.start()

// Introduce some actions that don't originate from the UI...
setTimeout(
  function () {
    air.setValue({ value: 23 })
  },
  2000
)

// Try to force a re-render and see how the UI responds when nothing actually changes...
setTimeout(
  function () {
    console.log('Trying to force a re-render by setting the temperature to the same value...')
    air.setValue({ value: 23 })
  },
  4000
)
