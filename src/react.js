import { Engine } from 'alma'
// import { NormalMutator as Mutator } from './adapters'
import { Temperature } from './operators/Temperature'
import { OpTreePresenter, ViewModelPresenter } from './ui/react'

const newEngine = function (opTree, data) {
  const engine = new Engine(new ViewModelPresenter())
  const model = engine.getModel()

  model
    // .setMutator(mutator)
    .set([], data)
    .setOpTree(opTree)

  return engine
}

const air = new Temperature()
const water = new Temperature()
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
