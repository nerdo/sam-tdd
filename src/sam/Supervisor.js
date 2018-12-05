export class Supervisor {
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
