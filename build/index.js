const babel = require('rollup-plugin-babel');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const pMap = require('p-map');
const rollup = require('rollup');
const uglify = require('uglify-js');

// prettier-ignore
const banner =
  '/*!\n' +
  ' * hippalus.js v' + pkg.version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Robin van der Vleuten <robin@webstronauts.co>\n' +
  ' * Released under the MIT License.\n' +
  ' */'

const buildEntry = config => {
  const isMinified = /min\.js$/.test(config.dest);

  return rollup.rollup(config).then(bundle => {
    let code = bundle.generate(config).code;

    if (isMinified) {
      code = uglify.minify(code).code;
    }

    return writeEntry(config.dest, code);
  });
};

const writeEntry = (dest, code) =>
  new Promise((resolve, reject) => {
    fs.writeFile(dest, code, err => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });

const plugins = [
  babel({
    presets: [['env', { modules: false }], 'flow'],
    exclude: 'node_modules/**',
    babelrc: false,
  }),
];

const external = ['react', 'path-to-regexp'];

const builds = [
  {
    entry: path.join(process.cwd(), 'src/index.js'),
    dest: path.join(process.cwd(), `dist/${pkg.name}.js`),
    format: 'cjs',
  },
  {
    entry: path.join(process.cwd(), 'src/index.js'),
    dest: path.join(process.cwd(), `dist/${pkg.name}.min.js`),
    format: 'cjs',
  },
  {
    entry: path.join(process.cwd(), 'src/index.js'),
    dest: path.join(process.cwd(), `dist/${pkg.name}.es.js`),
    format: 'es',
  },
];

pMap(builds, config =>
  buildEntry(
    Object.assign({}, config, {
      banner,
      plugins,
      external,
    })
  )
);
