import Immutable from 'seamless-immutable'

export class ImmutableGetSet {
  /**
   * Gets a value from an object.
   * @param {Object} obj - The object to get the value from.
   * @param {*[]} path  - The path (list of keys) to pull the value from.
   * @param {*} [defaultValue=undefined] - The value to return if it is not defined.
   * @returns {*} the value on the path, or the default value if it was not defined.
   */
  get (obj, path, defaultValue = void 0) {
    return path && path.length
      ? Immutable.from(Immutable.getIn(obj, path, defaultValue))
      : Immutable.from(obj)
  }

  /**
   * Sets a value on an object.
   * @param {Object} obj - The object to set the value on.
   * @param {*[]} path  - The path (list of keys) to set the value on.
   * @param {*} value - The value to set on the object.
   * @returns {Object} an object with the value set.
   */
  set (obj, path, value) {
    return path instanceof Array && path.length
      ? Immutable.setIn(obj, path, value)
      : value
  }
}
