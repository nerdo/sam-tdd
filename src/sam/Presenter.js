export class Presenter {
  render (representation) {
    this.state = representation
  }

  counter (model) {
    return model.data.counter
  }
}
