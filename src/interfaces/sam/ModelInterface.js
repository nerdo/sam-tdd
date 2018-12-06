export class ModelInterface {
  /**
   * Sets the supervisor.
   * @param {SupervisorInterface} supervisor
   */
  setSupervisor (supervisor) { throw new Error('Not Yet Implemented') }

  /**
   * Gets the supervisor.
   * @returns {SupervisorInterface}
   */
  getSupervisor () { throw new Error('Not Yet Implemented') }

  /**
   * Sets the mutator.
   * @param {MutatorInterface} mutator
   */
  setMutator (mutator) { throw new Error('Not Yet Implemented') }

  /**
   * Gets the mutator.
   * @returns {MutatorInterface}
   */
  getMutator () { throw new Error('Not Yet Implemented') }

  /**
   * Gets a value from the model data.
   * @param {*[]} path  - The path (list of keys) to pull the value from.
   * @param {*} [defaultValue=undefined] - The value to return if it is not defined.
   * @returns {*} the value on the path, or the default value if it was not defined.
   */
  get (path, defaultValue = void 0) { throw new Error('Not Yet Implemented') }

  /**
   * Presents a change to the model.
   * @param {mixed} incoming
   */
  present (incoming) { throw new Error('Not Yet Implemented') }
}
