export class Supervisor {
  constructor () {
    this.setPresenter = this.setPresenter.bind(this)
    this.process = this.process.bind(this)
    this.digest = this.digest.bind(this)
  }

  setPresenter (presenter) {
    this.presenter = presenter
  }

  process (model) {
    this.digest(model)
    this.nextAction(model)
  }

  digest (model) {
    let representation = this.presenter.counter(model)

    this.presenter.render(representation)
  }

  nextAction (model) {
  }
}
