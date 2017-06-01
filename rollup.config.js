const babel = require('rollup-plugin-babel');
const rollup = require('rollup');

const pkg = require('./package.json');
const format = process.env.FORMAT;

// prettier-ignore
const banner =
  '/*!\n' +
  ' * hippalus.js v' + pkg.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Robin van der Vleuten <robin@webstronauts.co>\n' +
  ' * Released under the MIT License.\n' +
  ' */';

module.exports = {
  entry: 'src/index.js',
  moduleName: 'hippalus',
  dest: pkg.main,
  banner,
  useStrict: false,
  format: 'iife',
  external: ['react', 'path-to-regexp'],
  plugins: [
    babel({
      presets: [['env', { modules: false }], 'flow'],
      exclude: 'node_modules/**',
      babelrc: false,
    }),
  ],
};
