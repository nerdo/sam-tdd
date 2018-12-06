export class Presenter {
  getRepresentation (model) {
    return this.temperature(model)
  }

  render (representation) {
    this.state = representation
  }

  temperature (model) {
    return model.data
  }
}
