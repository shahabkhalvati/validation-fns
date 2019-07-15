import V from './'
const rules = V.rules
const R = require('ramda')

describe('atomic rules', function () {
  test('handles undefined', function () {
    const valueToCheck = void 0

    expect(rules.isNilOrEmpty(valueToCheck)).toBe(true)
    expect(rules.isBoolean(valueToCheck)).toBe(false)
    expect(rules.isOptionalBoolean(valueToCheck)).toBe(true)
    expect(rules.isString(valueToCheck)).toBe(false)
    expect(rules.isEmptyString(valueToCheck)).toBe(false)
    expect(rules.isNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalString(valueToCheck)).toBe(true)
    expect(rules.isOptionalNonEmptyString(valueToCheck)).toBe(true)
    expect(rules.isOptionalNumber(valueToCheck)).toBe(true)
    expect(rules.isNumber(valueToCheck)).toBe(false)
    expect(rules.isObject(valueToCheck)).toBe(false)
    expect(rules.isNil(valueToCheck)).toBe(true)
    expect(rules.isLessThan(10)(valueToCheck)).toBe(false)
    expect(rules.isLessThanOrEqualTo(10)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThan(5)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThanOrEqualTo(5)(valueToCheck)).toBe(false)
    expect(rules.isInRange(5, 10)(valueToCheck)).toBe(false)
    expect(rules.isInRangeOrEqualTo(5, 10)(valueToCheck)).toBe(false)
  })

  test('handles null', function () {
    const valueToCheck = null

    expect(rules.isNilOrEmpty(valueToCheck)).toBe(true)
    expect(rules.isBoolean(valueToCheck)).toBe(false)
    expect(rules.isOptionalBoolean(valueToCheck)).toBe(true)
    expect(rules.isString(valueToCheck)).toBe(false)
    expect(rules.isEmptyString(valueToCheck)).toBe(false)
    expect(rules.isNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalString(valueToCheck)).toBe(true)
    expect(rules.isOptionalNonEmptyString(valueToCheck)).toBe(true)
    expect(rules.isOptionalNumber(valueToCheck)).toBe(true)
    expect(rules.isNumber(valueToCheck)).toBe(false)
    expect(rules.isObject(valueToCheck)).toBe(false)
    expect(rules.isNil(valueToCheck)).toBe(true)
    expect(rules.isLessThan(10)(valueToCheck)).toBe(false)
    expect(rules.isLessThanOrEqualTo(10)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThan(5)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThanOrEqualTo(5)(valueToCheck)).toBe(false)
    expect(rules.isInRange(5, 10)(valueToCheck)).toBe(false)
    expect(rules.isInRangeOrEqualTo(5, 10)(valueToCheck)).toBe(false)
  })

  test('handles non-empty strings', function () {
    const valueToCheck = 'non-empty-string'

    expect(rules.isNilOrEmpty(valueToCheck)).toBe(false)
    expect(rules.isBoolean(valueToCheck)).toBe(false)
    expect(rules.isOptionalBoolean(valueToCheck)).toBe(false)
    expect(rules.isString(valueToCheck)).toBe(true)
    expect(rules.isEmptyString(valueToCheck)).toBe(false)
    expect(rules.isNonEmptyString(valueToCheck)).toBe(true)
    expect(rules.isOptionalString(valueToCheck)).toBe(true)
    expect(rules.isOptionalNonEmptyString(valueToCheck)).toBe(true)
    expect(rules.isOptionalNumber(valueToCheck)).toBe(false)
    expect(rules.isNumber(valueToCheck)).toBe(false)
    expect(rules.isObject(valueToCheck)).toBe(false)
    expect(rules.isNil(valueToCheck)).toBe(false)
    expect(rules.isLessThan(10)(valueToCheck)).toBe(false)
    expect(rules.isLessThanOrEqualTo(10)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThan(5)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThanOrEqualTo(5)(valueToCheck)).toBe(false)
    expect(rules.isInRange(5, 10)(valueToCheck)).toBe(false)
    expect(rules.isInRangeOrEqualTo(5, 10)(valueToCheck)).toBe(false)
  })

  test('handles empty strings', function () {
    const valueToCheck = ''

    expect(rules.isNilOrEmpty(valueToCheck)).toBe(true)
    expect(rules.isBoolean(valueToCheck)).toBe(false)
    expect(rules.isOptionalBoolean(valueToCheck)).toBe(false)
    expect(rules.isString(valueToCheck)).toBe(true)
    expect(rules.isEmptyString(valueToCheck)).toBe(true)
    expect(rules.isNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalString(valueToCheck)).toBe(true)
    expect(rules.isOptionalNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalNumber(valueToCheck)).toBe(false)
    expect(rules.isNumber(valueToCheck)).toBe(false)
    expect(rules.isObject(valueToCheck)).toBe(false)
    expect(rules.isNil(valueToCheck)).toBe(false)
    expect(rules.isLessThan(10)(valueToCheck)).toBe(false)
    expect(rules.isLessThanOrEqualTo(10)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThan(5)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThanOrEqualTo(5)(valueToCheck)).toBe(false)
    expect(rules.isInRange(5, 10)(valueToCheck)).toBe(false)
    expect(rules.isInRangeOrEqualTo(5, 10)(valueToCheck)).toBe(false)
  })

  test('handles numbers', function () {
    const valueToCheck = 123

    expect(rules.isNilOrEmpty(valueToCheck)).toBe(false)
    expect(rules.isBoolean(valueToCheck)).toBe(false)
    expect(rules.isOptionalBoolean(valueToCheck)).toBe(false)
    expect(rules.isString(valueToCheck)).toBe(false)
    expect(rules.isEmptyString(valueToCheck)).toBe(false)
    expect(rules.isNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalString(valueToCheck)).toBe(false)
    expect(rules.isOptionalNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalNumber(valueToCheck)).toBe(true)
    expect(rules.isNumber(valueToCheck)).toBe(true)
    expect(rules.isObject(valueToCheck)).toBe(false)
    expect(rules.isNil(valueToCheck)).toBe(false)

    expect(rules.isLessThan(10)(valueToCheck)).toBe(false)
    expect(rules.isLessThan(valueToCheck)(valueToCheck)).toBe(false)
    expect(rules.isLessThan(200)(valueToCheck)).toBe(true)
    expect(rules.isLessThanOrEqualTo(10)(valueToCheck)).toBe(false)
    expect(rules.isLessThanOrEqualTo(valueToCheck)(valueToCheck)).toBe(true)
    expect(rules.isLessThanOrEqualTo(200)(valueToCheck)).toBe(true)

    expect(rules.isGreaterThan(10)(valueToCheck)).toBe(true)
    expect(rules.isGreaterThan(valueToCheck)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThan(200)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThanOrEqualTo(10)(valueToCheck)).toBe(true)
    expect(rules.isGreaterThanOrEqualTo(valueToCheck)(valueToCheck)).toBe(true)
    expect(rules.isGreaterThanOrEqualTo(200)(valueToCheck)).toBe(false)

    expect(rules.isInRange(5, 10)(valueToCheck)).toBe(false)
    expect(rules.isInRange(valueToCheck, 10)(valueToCheck)).toBe(false)
    expect(rules.isInRange(valueToCheck, valueToCheck)(valueToCheck)).toBe(false)
    expect(rules.isInRange(5, valueToCheck)(valueToCheck)).toBe(false)
    expect(rules.isInRange(valueToCheck - 1, valueToCheck + 1)(valueToCheck)).toBe(true)

    expect(
      rules.isInRangeOrEqualTo(valueToCheck, valueToCheck)(valueToCheck))
      .toBe(true)
    expect(
      rules.isInRangeOrEqualTo(valueToCheck - 1, valueToCheck)(valueToCheck))
      .toBe(true)
    expect(
      rules.isInRangeOrEqualTo(valueToCheck, valueToCheck + 1)(valueToCheck))
      .toBe(true)
    expect(
      rules.isInRangeOrEqualTo(valueToCheck - 1, valueToCheck + 1)(valueToCheck))
      .toBe(true)
    expect(rules.isInRangeOrEqualTo(5, 10)(valueToCheck)).toBe(false)
  })
  test('handles objects', function () {
    const valueToCheck = {}

    expect(rules.isNilOrEmpty(valueToCheck)).toBe(true)
    expect(rules.isBoolean(valueToCheck)).toBe(false)
    expect(rules.isOptionalBoolean(valueToCheck)).toBe(false)
    expect(rules.isString(valueToCheck)).toBe(false)
    expect(rules.isEmptyString(valueToCheck)).toBe(false)
    expect(rules.isNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalString(valueToCheck)).toBe(false)
    expect(rules.isOptionalNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalNumber(valueToCheck)).toBe(false)
    expect(rules.isNumber(valueToCheck)).toBe(false)
    expect(rules.isObject(valueToCheck)).toBe(true)
    expect(rules.isNil(valueToCheck)).toBe(false)
    expect(rules.isLessThan(10)(valueToCheck)).toBe(false)
    expect(rules.isLessThanOrEqualTo(10)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThan(5)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThanOrEqualTo(5)(valueToCheck)).toBe(false)
    expect(rules.isInRange(5, 10)(valueToCheck)).toBe(false)
    expect(rules.isInRangeOrEqualTo(5, 10)(valueToCheck)).toBe(false)
  })
})

describe('rule builders', function () {
  const T = R.T
  const F = R.F

  test('allPass', function () {
    expect(V.where.allPass([])()).toBe(true)
    expect(V.where.allPass([T])()).toBe(true)
    expect(V.where.allPass([F])()).toBe(false)
    expect(V.where.allPass([T, T, F])()).toBe(false)
    expect(V.where.allPass([T, T, T])()).toBe(true)
  })

  test('anyPass', function () {
    expect(V.where.anyPass([])()).toBe(false)
    expect(V.where.anyPass([T])()).toBe(true)
    expect(V.where.anyPass([F])()).toBe(false)
    expect(V.where.anyPass([F, F, F])()).toBe(false)
    expect(V.where.anyPass([F, F, T])()).toBe(true)
  })

  test('handles functions', function () {
    const valueToCheck = function () {}

    expect(rules.isNilOrEmpty(valueToCheck)).toBe(false)
    expect(rules.isBoolean(valueToCheck)).toBe(false)
    expect(rules.isOptionalBoolean(valueToCheck)).toBe(false)
    expect(rules.isString(valueToCheck)).toBe(false)
    expect(rules.isEmptyString(valueToCheck)).toBe(false)
    expect(rules.isNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalString(valueToCheck)).toBe(false)
    expect(rules.isOptionalNonEmptyString(valueToCheck)).toBe(false)
    expect(rules.isOptionalNumber(valueToCheck)).toBe(false)
    expect(rules.isNumber(valueToCheck)).toBe(false)
    expect(rules.isObject(valueToCheck)).toBe(false)
    expect(rules.isNil(valueToCheck)).toBe(false)
    expect(rules.isLessThan(10)(valueToCheck)).toBe(false)
    expect(rules.isLessThanOrEqualTo(10)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThan(5)(valueToCheck)).toBe(false)
    expect(rules.isGreaterThanOrEqualTo(5)(valueToCheck)).toBe(false)
    expect(rules.isInRange(5, 10)(valueToCheck)).toBe(false)
    expect(rules.isInRangeOrEqualTo(5, 10)(valueToCheck)).toBe(false)
  })
})
