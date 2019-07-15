import rules from './rules'
const R = require('ramda')

const schema = (model) => {
  if (!rules.isObject(model)) {
    throw new Error('Schema is not valid.')
  }

  const validate = R.where(model)
  const getRequiredFields = () => R.reduce(
    (acc, schemaKey) => {
      const predForKey = R.pick([schemaKey], model)
      const isPredTrueWithoutData = R.where(predForKey, {})

      return isPredTrueWithoutData ? acc : [...acc, schemaKey]
    }, [], R.keys(model))

  return {
    validate,
    get requiredFields () {
      return getRequiredFields()
    },
    from: (data) => {
      const extractedData = R.pick(R.keys(model), data)
      return validate(extractedData) ? extractedData : (void 0)
    }
  }
}

export default schema
