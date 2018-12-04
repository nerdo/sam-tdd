export class View {
  constructor () {
    this.display = this.display.bind(this)
  }

  display (representation) {
    this.representation = representation
  }

  counter (model) {
    return model.data.counter
  }
}
