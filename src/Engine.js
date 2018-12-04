export class Engine {
  constructor (view, state, model, actions) {
    this.view = view
    this.state = state
    this.model = model
    this.actions = actions
  }

  start () {
    this.state.setView(this.view)
    this.model.setState(this.state)
    this.actions.setModel(this.model)
    this.state.render(this.model)
  }
}
