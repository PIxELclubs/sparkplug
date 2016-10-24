import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import modify from 'modify-babel-preset';

export default {
  entry: 'src/index.js',
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
        'es2015-rollup'
      ]
    }),
  ],
  dest: 'bundle.js'
};