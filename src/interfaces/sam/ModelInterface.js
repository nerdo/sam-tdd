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
   * Presents a change to the model.
   * @param {mixed} change
   */
  present (change) { throw new Error('Not Yet Implemented') }
}
