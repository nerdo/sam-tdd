export class Presenter {
  render (representation) {
    this.state = representation
  }

  temperature (model) {
    return model.data
  }
}
