// import { convertTemperature } from '../helpers/convertTemperature'

export class Supervisor {
  setPresenter (presenter) { this.presenter = presenter }

  getPresenter () { return this.presenter }

  setActions (actions) { this.actions = actions }

  getActions () { return this.actions }

  process (model) {
    this.digest(model)
    this.nextAction(model)
  }

  digest (model) {
    let representation = this.presenter.temperature(model)

    this.presenter.render(representation)
  }

  nextAction (model) {
    if (typeof model.get(['changed', 'units']) !== 'undefined') {
      this.getActions().setTemperature(
        convertTemperature(model.get(['value']), model.get(['changed', 'units']), model.get(['units']))
      )
    }
  }
}
