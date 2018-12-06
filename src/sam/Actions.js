export class Actions {
  setModel (model) { this.model = model }

  getModel () { return this.model }

  setTemperature (value) {
    this.model.present({ value })
  }

  setTemperatureUnits (units) {
    this.model.present({ units })
  }
}
