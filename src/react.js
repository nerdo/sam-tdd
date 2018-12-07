import { Supervisor, Model, Engine } from './index'
import { NormalMutator as Mutator } from './adapters'
import { TemperatureOp } from './operatives/TemperatureOp'
import { ReactPresenter } from './ui/react'

const newEngine = function (opTree, data) {
  const mutator = new Mutator()
  const presenter = new ReactPresenter()
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

setTimeout(
  function () {
    air.setValue({ value: 23 })
  },
  1500
)
