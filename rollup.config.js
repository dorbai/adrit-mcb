import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      inlineDynamicImports: true,
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      inlineDynamicImports: true,
      sourcemap: true,
    },
  ],
  external: [
    'react',
    'react-dom',
    'styled-components',
    '@google/generative-ai',
    /react-dom\[.*]/, //handles all versions of react-dom
  ],
  plugins: [
    resolve(),
    json(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/__tests__/**'],
    }),
  ],
};
