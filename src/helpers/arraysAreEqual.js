// Based on https://github.com/component/array-equal, but covered with tests.
export function arraysAreEqual (arr1, arr2) {
  const typeofArr1 = typeof arr1
  const typeofArr2 = typeof arr2
  if (typeofArr1 === 'undefined' && typeofArr2 === 'undefined') { return true }
  if (typeofArr1 === 'undefined' && typeofArr2 !== 'undefined') { return false }
  if (typeofArr2 === 'undefined' && typeofArr1 !== 'undefined') { return false }

  const length = arr1.length
  if (length !== arr2.length) return false
  for (let i = 0; i < length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}
