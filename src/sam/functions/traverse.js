import { isPlainObject } from 'lodash'

export function traverse (tree, fn) {
  recurse(tree, fn, [])
}

function recurse (tree, fn, path) {
  if (typeof tree === 'undefined') {
    return
  }

  for (const key of Object.getOwnPropertyNames(tree).concat(Object.getOwnPropertySymbols(tree))) {
    const node = tree[key]
    if (isLeaf(node)) {
      fn(path.concat(key), node)
    } else {
      recurse(node, fn, path.concat(key))
    }
  }
}

function isLeaf (node, path) {
  return !isPlainObject(node)
}
