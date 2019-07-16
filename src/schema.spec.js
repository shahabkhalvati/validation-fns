import rules from './rules'
import schema from './schema'
const R = require('ramda')

describe('Schema', function () {
  test('should fail when offered non-object as schema', function () {
    expect(() => schema()).toThrow()
    expect(() => schema(null)).toThrow()
    expect(() => schema(void 0)).toThrow()
    expect(() => schema('stuff')).toThrow()
    expect(() => schema(123)).toThrow()
    expect(() => schema(function () {})).toThrow()
  })

  test('validate object against schema', function () {
    const model = schema({
      field: rules.isString
    })

    expect(model.validate({ field: '' })).toBe(true)
    expect(model.validate({ field: 'string value' })).toBe(true)
    expect(model.validate({ field: null })).toBe(false)
    expect(model.validate({ field: void 0 })).toBe(false)
    expect(model.validate({ field: 123 })).toBe(false)
    expect(model.validate({ field: {} })).toBe(false)
    expect(model.validate({ field: new Date() })).toBe(false)
    expect(model.validate({ field: function () { } })).toBe(false)
  })

  test('validate object with redundant fields against schema', function () {
    const model = schema({
      field: rules.isString
    })

    expect(model.validate({
      field: 'string',
      redundant: 'redundant value'
    })).toBe(true)
  })

  test('validate objects with missing fields', function () {
    const model = schema({
      field: rules.isString
    })

    expect(model.validate({ redundant: 'string value' })).toBe(false)
  })

  test('can compute required fields', function () {
    const model = schema({
      name: rules.isString,
      middleName: rules.isOptionalString,
      age: rules.isNumber,
      friends: rules.isOptionalNumber
    })
    const requiredFields = ['name', 'age']

    const result = model.requiredFields
    expect(result.length).toBe(requiredFields.length)
    expect(result).toEqual(expect.arrayContaining(requiredFields))
  })

  test('can extract data from dictionary when all is fine', function () {
    const data = {
      name: 'name',
      lastName: 'lastName',
      age: 15
    }
    const model = schema({
      name: rules.isString,
      occupation: rules.isOptionalString
    })

    const extractedObj = model.from(data)
    expect(extractedObj).toEqual({ name: 'name' })
  })

  test('can extract data from dictionary when all is fine and there are no required fields', function () {
    const data = {
      name: 'name',
      lastName: 'lastName',
      occupation: 'occupation',
      age: 15
    }
    const model = schema({
      occupation: rules.isOptionalString
    })

    const extractedObj = model.from(data)
    expect(extractedObj).toEqual({ occupation: 'occupation' })
  })

  test('can extract data from dictionary when no provided data is needed', function () {
    const data = {
      name: 'name',
      lastName: 'lastName',
      age: 15
    }
    const model = schema({
      occupation: rules.isOptionalString
    })

    const extractedObj = model.from(data)
    expect(extractedObj).toEqual({})
  })

  test('return undefined on extraction from dictionary when provided data is invalid', function () {
    const data = {
      name: 14,
      lastName: 'lastName',
      age: 15
    }
    const model = schema({
      name: rules.isString,
      occupation: rules.isOptionalString
    })

    const extractedObj = model.from(data)
    expect(extractedObj).toBeUndefined()
  })

  test('return undefined on extraction from dictionary when required field is missing', function () {
    const data = {
      lastName: 'lastName',
      age: 15
    }
    const model = schema({
      name: rules.isString,
      occupation: rules.isOptionalString
    })

    const extractedObj = model.from(data)
    expect(extractedObj).toBeUndefined()
  })

  test('validate nested schema', function () {
    const validData = {
      simple: 'simple',
      nested: {
        numField: 123,
        simple: 'simple',
        nested: {
          num: 321,
          sample: 'sample'
        },
        simpleField: 'simple field 2'
      },
      simpleField: 'simple field'
    }

    const invalidData = {
      simple: 'simple',
      nested: {
        numField: 123,
        simple: 432,
        nested: {
          num: 321,
          sample: 'sample'
        },
        simpleField: 'simple field 2'
      },
      simpleField: 'simple field'
    }

    const invalidDataInLevel2 = {
      simple: 'simple',
      nested: {
        numField: 123,
        simple: 'simple',
        nested: {
          num: '321',
          sample: 'sample'
        },
        simpleField: 'simple field 2'
      },
      simpleField: 'simple field'
    }

    const model = schema({
      simple: rules.isString,
      nested: {
        numField: rules.isNumber,
        simple: rules.isString,
        nested: {
          num: rules.isNumber,
          sample: rules.isString
        },
        simpleField: rules.isString
      },
      simpleField: rules.isString
    })

    expect(model.validate(validData)).toBe(true)
    expect(model.validate(invalidData)).toBe(false)
    expect(model.validate(invalidDataInLevel2)).toBe(false)
  })

  test('validate nested schema, when obj is missing the nested one', function () {
    const nestedRootMissing = {
      simple: 'simple',
      simpleField: 'simple field'
    }

    const nestedRootIsEmpty = {
      simple: 'simple',
      nested: {},
      simpleField: 'simple field 2'
    }
    const nestedRootIsNull = {
      simple: 'simple',
      nested: null,
      simpleField: 'simple field 2'
    }
    const nestedRootIsUndefined = {
      simple: 'simple',
      nested: void 0,
      simpleField: 'simple field 2'
    }
    const nestedRootIsSimple = {
      simple: 'simple',
      nested: 123,
      simpleField: 'simple field 2'
    }

    const model = schema({
      simple: rules.isString,
      nested: {
        numField: rules.isNumber,
        simple: rules.isString,
        nested: {
          num: rules.isNumber,
          sample: rules.isString
        },
        simpleField: rules.isString
      },
      simpleField: rules.isString
    })

    expect(model.validate(nestedRootIsEmpty)).toBe(false)
    expect(model.validate(nestedRootMissing)).toBe(false)
    expect(model.validate(nestedRootIsNull)).toBe(false)
    expect(model.validate(nestedRootIsUndefined)).toBe(false)
    expect(model.validate(nestedRootIsSimple)).toBe(false)
  })
})
