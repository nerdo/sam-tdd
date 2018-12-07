import { Supervisor, Model, Engine } from './index'
import { NormalMutator as Mutator } from './adapters'
import { TemperatureOp } from './operatives/TemperatureOp'
import { OpTreePresenter } from './ui/react'

const newEngine = function (opTree, data) {
  const mutator = new Mutator()
  const presenter = new OpTreePresenter()
  const supervisor = new Supervisor()
  const model = new Model()

  model.setMutator(mutator)
  model.set([], data)
  model.setOpTree(opTree)

  return new Engine(presenter, supervisor, model)
}

const air = new TemperatureOp()
const water = new TemperatureOp()
const engine = newEngine({ air, water })

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
    air.setValue({ value: 23 })
  },
  4000
)
