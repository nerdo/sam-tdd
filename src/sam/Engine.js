export class Engine {
  constructor (presenter, supervisor, model, actions) {
    this.setPresenter(presenter)
    this.setSupervisor(supervisor)
    this.setModel(model)
    this.setActions(actions)
  }

  setPresenter (presenter) { this.presenter = presenter }

  setSupervisor (supervisor) { this.supervisor = supervisor }

  setModel (model) { this.model = model }

  setActions (actions) { this.actions = actions }

  getPresenter () { return this.presenter }

  getSupervisor () { return this.supervisor }

  getModel () { return this.model }

  getActions () { return this.actions }

  start () {
    this.supervisor.setPresenter(this.presenter)
    this.model.setSupervisor(this.supervisor)
    this.actions.setModel(this.model)
    this.supervisor.process(this.model)
  }
}
