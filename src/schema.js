import fns from 'fns'
import rules from './rules'
import * as R from 'ramda'
// import * as S from 'sanctuary'

const schema = (rawModel) => {
  if (!rules.isObject(rawModel)) {
    throw new Error('Schema is not valid.')
  }

  const model = R.mapObjIndexed(
    (val, key) =>
      rules.isObject(val)
        ? schema(val).validate
        : val
  )(rawModel)

  const validate = fns.common.evaluateIfNot(rules.isNil, R.where(model), false)
  const getRequiredFields = () => R.reduce(
    (acc, schemaKey) => {
      const predForKey = R.pick([schemaKey], model)
      const isPredTrueWithoutData = R.where(predForKey, {})

      return isPredTrueWithoutData ? acc : R.append(schemaKey, acc)
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
