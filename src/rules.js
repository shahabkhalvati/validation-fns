const fns = require('fns')
const R = require('ramda')

const isString = R.is(String)
const isEmptyString = R.both(isString, R.isEmpty)
const isNonEmptyString = R.both(isString, R.complement(R.isEmpty))
const isNumber = R.is(Number)
const isObject = R.is(Object)
const isBoolean = R.is(Boolean)
const isNil = R.isNil
const isNilOrEmpty = R.either(isNil, R.isEmpty)

const evaluateIfIsNumber = fns.common.evaluateIf(isNumber)
const isLessThan = R.flip(evaluateIfIsNumber(R.lt, false))
const isLessThanOrEqualTo = R.flip(evaluateIfIsNumber(R.lte, false))
const isGreaterThan = R.flip(evaluateIfIsNumber(R.gt, false))
const isGreaterThanOrEqualTo = R.flip(evaluateIfIsNumber(R.gte, false))

const isInRangeLogic = (min, max) => R.both(isLessThan(max), isGreaterThan(min))
const isInRange = evaluateIfIsNumber(R.curry(isInRangeLogic), false)

const isInRangeOrEqualToLogic =
  (min, max) => R.anyPass([isInRange(min, max), R.equals(min), R.equals(max)])
const isInRangeOrEqualTo = evaluateIfIsNumber(R.curry(isInRangeOrEqualToLogic), false)

const isOptional = (predicate) => R.either(isNil, predicate)

export default {
  isNothingOrPass: isOptional,
  anyPass: R.anyPass,
  allPass: R.allPass,
  isNilOrEmpty,
  isBoolean,
  isOptionalBoolean: isOptional(isBoolean),
  isString,
  isEmptyString,
  isNonEmptyString,
  isOptionalString: isOptional(isString),
  isOptionalNonEmptyString: isOptional(isNonEmptyString),
  isOptionalNumber: isOptional(isNumber),
  isNumber,
  isObject,
  isNil,
  isLessThan,
  isLessThanOrEqualTo,
  isGreaterThan,
  isGreaterThanOrEqualTo,
  isInRange,
  isInRangeOrEqualTo
}
