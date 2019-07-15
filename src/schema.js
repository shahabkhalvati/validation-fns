import rules from './rules'
const R = require('ramda')

const schema = (model) => {
  if (!rules.isObject(model)) {
    throw new Error('Schema is not valid.')
  }

  return {
    validate: R.where(model),
    getRequiredFields: () => {
      const schemaKeys = R.keys(model)

      const requiredFields = R.reduce((acc, schemaKey) => {
        const predForKey = R.pick([schemaKey], model)
        const isPredTrueWithoutData = R.where(predForKey, {})

        if (!isPredTrueWithoutData) {
          return [...acc, schemaKey]
        }
        return acc
      }, [], schemaKeys)
      return requiredFields
    }
  }
}

export default schema
