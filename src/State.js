export class State {
  constructor () {
    this.setView = this.setView.bind(this)
    this.render = this.render.bind(this)
    this.representation = this.representation.bind(this)
  }

  setView (view) {
    this.view = view
  }

  render (model) {
    this.representation(model)
  }

  representation (model) {
    let representation = this.view.counter(model)

    this.view.display(representation)
  }
}
