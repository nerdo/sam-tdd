export class Engine {
  constructor (presenter, supervisor, model) {
    this.setPresenter(presenter)
    this.setSupervisor(supervisor)
    this.setModel(model)
  }

  setPresenter (presenter) { this.presenter = presenter }

  setSupervisor (supervisor) { this.supervisor = supervisor }

  setModel (model) { this.model = model }

  getPresenter () { return this.presenter }

  getSupervisor () { return this.supervisor }

  getModel () { return this.model }

  reset () {
    this.initialize()
    this.model.reset()
  }

  start () {
    this.initialize()
    this.supervisor.process(this.model)
  }

  initialize () {
    this.supervisor.setPresenter(this.presenter)
    this.model.setSupervisor(this.supervisor)
  }
}
