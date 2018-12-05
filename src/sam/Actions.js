export class Actions {
  setModel (model) { this.model = model }

  getModel () { return this.model }

  increment () {
    this.model.present({ counter: this.model.data.counter + 1 })
  }
}
