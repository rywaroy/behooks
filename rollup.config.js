import babel from 'rollup-plugin-babel';
import rollupTypescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { DEFAULT_EXTENSIONS } from '@babel/core';

export default {
  input: 'index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    }),
    rollupTypescript({
      tsconfig: 'tsconfig.build.json',
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
        '.tsx',
      ],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    uglify(),
  ],
  external: ['react'],
  onwarn(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }

    // console.warn everything else
    console.warn(warning.message);
  },
};
