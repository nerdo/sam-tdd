export class Presenter {
  constructor () {
    this.render = this.render.bind(this)
  }

  render (representation) {
    this.state = representation
  }

  counter (model) {
    return model.data.counter
  }
}
