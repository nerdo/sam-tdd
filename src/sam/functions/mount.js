import { NormalMutator } from '../../adapters/NormalMutator'

const normalMutator = new NormalMutator()

export function mount (op, model, path) {
  model.opTree = normalMutator.set(model.opTree, path, op)
  return op
}
