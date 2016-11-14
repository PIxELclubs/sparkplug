import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const NODE_ENV = process.env.NODE_ENV || 'development';

const BUNDLE = 'bundle.js';

function babelBundle(...args) {
  const upstream = babel(...args);
  return {
    name: 'babel-bundle',
    transformBundle(code) {
      return upstream.transform(code, BUNDLE);
    }
  };
}

export default {
  entry: 'src/index.browser.js',
  format: 'iife',
  moduleName: 'main',
  plugins: [
    json(),
    nodeResolve({
      jsnext: true,
      browser: true
    }),
    commonjs({
      include: 'node_modules/**',
      ignoreGlobal: false,
      sourceMap: false
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['es2015', {modules: false}],
        'react',
        'stage-2'
      ],
      plugins: [
        'external-helpers'
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ].concat(NODE_ENV === 'production' ? [
    babelBundle({
      presets: [
        'babili'
      ],
      comments: false
    })
  ] : []),
  dest: 'bundle.js'
};
