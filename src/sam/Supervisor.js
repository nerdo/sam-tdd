// import { convertTemperature } from '../helpers/convertTemperature'

export class Supervisor {
  setPresenter (presenter) { this.presenter = presenter }

  getPresenter () { return this.presenter }

  setNextActionDelegates (before, after) {
    this.nextActionDelegateBefore = before
    this.nextActionDelegateAfter = after
  }

  getNextActionDelegates () { return [this.nextActionDelegateBefore, this.nextActionDelegateAfter] }

  setActions (actions) { this.actions = actions }

  getActions () { return this.actions }

  process (model) {
    this.digest(model)
    this.nextAction(model)
  }

  digest (model) {
    const representation = this.presenter.getRepresentation(model)
    this.presenter.render(representation)
  }

  nextAction (model) {
    const [beforeOps, afterOps] = this.getNextActionDelegates()

    if (beforeOps) {
      this.beforeOps(model)
    }

    // Allow operatives to tap into next actions through the model.
    model.nextAction()

    if (afterOps) {
      this.afterOps(model)
    }
  }
}
