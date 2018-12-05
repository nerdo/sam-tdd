export class Actions {
  setModel (model) {
    this.model = model
  }

  increment () {
    this.model.present({ counter: this.model.data.counter + 1 })
  }
}
