export class Actions {
  constructor () {
    this.setModel = this.setModel.bind(this)
    this.increment = this.increment.bind(this)
  }

  setModel (model) {
    this.model = model
  }

  increment () {
    this.model.present({ counter: this.model.data.counter + 1 })
  }
}
