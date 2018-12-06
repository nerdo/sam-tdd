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
   * @param {*} [defaultValue] - The value to return if it is not defined.
   * @returns {*} the value on the path, or the default value if it was not defined.
   */
  get (path, defaultValue) { throw new Error('Not Yet Implemented') }

  /**
   * Sets a value in the model data.
   * @param {*[]} path  - The path (list of keys) to set the value on.
   * @param {*} value - The value to set in the model data.
   * @returns {Object} the model data with the value set.
   */
  set (path, value) { throw new Error('Not Yet Implemented') }

  /**
   *
   * @param {Object} tree - A tree with Operative instances representing the system.
   */
  setOpTree (tree) { throw new Error('Not Yet Implemented') }

  /**
   * Gets the operative tree.
   * @param {*[]} path  - The path (list of keys) to pull the value from.
   * @returns {*} the subtree at path, or the entire tree if no path is defined.
   */
  getOpTree (path) { throw new Error('Not Yet Implemented') }

  /**
   * Resets the data and all operatives.
   */
  reset () { throw new Error('Not Yet Implemented') }

  /**
   * Calls nextAction on all operatives.
   */
  nextAction () { throw new Error('Not Yet Implemented') }
}
