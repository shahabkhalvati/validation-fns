const R = require('ramda')

const evaluateIf = R.curry(
  function (predicate, fn, defaultValue) {
    return R.ifElse(predicate, fn, R.always(defaultValue))
  })
const evaluateIfNot = R.curry(
  function (predicate, fn, defaultValue) {
    return R.ifElse(predicate, R.always(defaultValue), fn)
  })

const random = Math.random
const randomInRange = R.curry(
  (fractionDigits, min, max) => {
    const fractionMultiplier = Math.pow(10, fractionDigits)
    return Math.round(
      (Math.random() * (max - min) + min) * fractionMultiplier
    ) / fractionMultiplier
  })
const randomIntInRange = randomInRange(0)
const randomIntSmallerThan = randomIntInRange(0)
const randomIntLargerThan = randomIntInRange(R.__)(Number.MAX_SAFE_INTEGER)

export default {
  evaluateIf,
  evaluateIfNot,
  random,
  randomInRange,
  randomIntInRange,
  randomIntLargerThan,
  randomIntSmallerThan
}
