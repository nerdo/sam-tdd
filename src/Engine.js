export class Engine {
  constructor (presenter, supervisor, model, actions) {
    this.presenter = presenter
    this.supervisor = supervisor
    this.model = model
    this.actions = actions
  }

  start () {
    this.supervisor.setPresenter(this.presenter)
    this.model.setSupervisor(this.supervisor)
    this.actions.setModel(this.model)
    this.supervisor.process(this.model)
  }
}
