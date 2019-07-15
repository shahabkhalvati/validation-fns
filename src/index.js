import rules, { allPass, anyPass, isNothingOrPass } from './rules'
import schema from './schema'

export default {
  where: {
    allPass,
    anyPass,
    isNothingOrPass
  },
  rules,
  schema
}
