const babel = require('rollup-plugin-babel');
const rollup = require('rollup');

const pkg = require('./package.json');

module.exports = {
  entry: 'src/index.js',
  moduleName: 'hippalus',
  dest: pkg.main,
  useStrict: false,
  format: 'umd',
  exports: 'named',
  external: ['react', 'path-to-regexp'],
  globals: {
    'path-to-regexp': 'Regexp',
    react: 'React',
  },
  plugins: [
    babel({
      presets: [['env', { modules: false }]],
      exclude: 'node_modules/**',
      babelrc: false,
    }),
  ],
};
