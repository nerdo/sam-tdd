import { convertTemperature } from '../helpers/convertTemperature'
import { NormalMutator } from '../adapters'
import { traverse } from './functions';

const normalMutator = new NormalMutator()

export class Model {
  constructor (mutator, data = {}) {
    this.setMutator(mutator)
    this.data = data
    this.opTree = {}
  }

  setSupervisor (supervisor) { this.supervisor = supervisor }

  getSupervisor () { return this.supervisor }

  setMutator (mutator) { this.mutator = mutator }

  getMutator () { return this.mutator }

  get (path, defaultValue) { return this.mutator.get(this.data, path, defaultValue) }

  set (path, value) { this.data = this.mutator.set(this.data, path, value) }

  setOpTree (tree) {
    traverse(tree, (path, op) => op.mount(this, path))
  }

  getOpTree (path) { return normalMutator.get(this.opTree, path) }

  reset () {
    this.data = {}
    traverse(this.opTree, (path, op) => op.reset())
  }

  nextAction () {
    traverse(this.opTree, (path, op) => op.nextAction ? op.nextAction() : null)
  }
}
