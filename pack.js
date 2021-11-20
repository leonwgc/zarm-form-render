/* eslint-disable @typescript-eslint/no-var-requires */
const { default: pack } = require('packx');
const path = require('path');

pack(true, {
  entry: {
    index: `./demo/index`,
  },
  output: {
    path: path.resolve(__dirname, 'output'),
  },
  devServer: {
    port: 9001,
  },
  resolve: {
    alias: {
      'zarm-form-render': path.resolve(__dirname, './src'),
    },
  },
});
