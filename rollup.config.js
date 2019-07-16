import del from 'rollup-plugin-delete'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const plugins = [
  resolve(),
  babel({
    exclude: 'node_modules/**'
  }),
  terser(),
  filesize()
]

const external = ['ramda', 'regular-fns']

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'validation',
      file: pkg.browser,
      format: 'umd'
    },
    external,
    plugins: [
      del({ targets: ['dist/*', 'build/*'] }),
      commonjs(),
      ...plugins]
  },
  {
    input: 'src/index.js',
    external,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins
  }
]
