export class SupervisorInterface {
  /**
   * Sets the presenter.
   * @param {PresenterInterface} presenter
   */
  setPresenter (presenter) { throw new Error('Not Yet Implemented') }

  /**
   * Gets the presenter.
   * @returns {PresenterInterface}
   */
  getPresenter () { throw new Error('Not Yet Implemented') }

  /**
   * Sets the actions.
   * @param {ActionsInterface} actions
   */
  setActions (actions) { throw new Error('Not Yet Implemented') }

  /**
   * Gets the actions.
   * @returns {ActionsInterface}
   */
  getActions () { throw new Error('Not Yet Implemented') }

  /**
   * Processes the model.
   * @param {ModelInterface} model
   */
  process (model) { throw new Error('Not Yet Implemented') }

  /**
   * Digests the model to be consumed by PresenterInterface.render().
   * @param {ModelInterface} model
   */
  digest (model) { throw new Error('Not Yet Implemented') }

  /**
   * Triggers actions after the model is digested.
   * @param {ModelInterface} model
   */
  nextAction (model) { throw new Error('Not Yet Implemented') }
}
