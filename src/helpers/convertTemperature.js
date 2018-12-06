export function convertTemperature (value, from, to) {
  if (from === 'F') {
    if (to === 'C') {
      return (value - 32) / 9 * 5
    } else if (to === 'K') {
      return (value - 32) * 5 / 9 + 273.15
    } else {
      return value
    }
  } else if (from === 'C') {
    if (to === 'F') {
      return value * 9 / 5 + 32
    } else if (to === 'K') {
      return value + 273.15
    } else {
      return value
    }
  } else if (from === 'K') {
    if (to === 'C') {
      return value - 273.15
    } else if (to === 'F') {
      return (value - 273.15) * 9 / 5 + 32
    } else {
      return value
    }
  }
}
