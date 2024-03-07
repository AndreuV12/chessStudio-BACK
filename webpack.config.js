// const path = require('path');
// const nodeExternals = require('webpack-node-externals');

// module.exports = {
//   mode: 'development',
//   entry: {
//     app: path.resolve(__dirname, 'src', 'app.js'),
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'app.cjs'
//   },
//   target: 'node',
//   externals: [
//     nodeExternals(),
//     // {
//     //   express: 'commonjs express'
//     // }
//   ],
// };
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src', 'app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.cjs',
  },
  target: 'node',
  externals: [
    nodeExternals(),
  ],
};