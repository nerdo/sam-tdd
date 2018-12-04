export class Engine {
  constructor (view, state, model, actions) {
    this.view = view
    this.state = state
    this.model = model
    this.actions = actions
  }

  start () {
    this.state.setView(view)
    this.model.setState(state)
    this.actions.setModel(model)
    this.state.render(model)
  }
}
