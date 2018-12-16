const defaultArgMapper = args => args
export function memoized (fn, argMapper = defaultArgMapper) {
  const cache = {}

  return [
    function (...args) {
      const cacheKey = JSON.stringify(argMapper(args))
      cache[cacheKey] = cache[cacheKey] || fn(...args)
      return cache[cacheKey]
    },
    function (obj) {
      Object.entries(cache)
        .filter(([key, value]) => value === obj)
        .map(([key]) => cache[key] = void 0)
    }
  ]
}
