/* istanbul ignore file */
const R = require('ramda')

const prettyPrint = (obj) => JSON.stringify(obj, null, 2)
const inspect =
  (desc) =>
    (i) =>
      console.log(`${desc}:\n${prettyPrint(i)}`) || R.identity(i)

const print =
  (desc) =>
    (i) =>
      console.log(desc || '') || R.identity(i)

const FOCUS_CHARS = '----------------------------------------'
const focusedInspect =
  desc =>
    R.compose(
      print(), print(FOCUS_CHARS), inspect(desc), print(FOCUS_CHARS), print())

export default {
  prettyPrint,
  print,
  focusedInspect,
  inspect
}
