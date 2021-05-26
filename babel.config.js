module.exports = {
  presets: [
    require.resolve('@babel/preset-env', {
      targets: {
        node: 'current',
      },
    }),
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  // plugins: [
  //   [
  //     require.resolve('@babel/plugin-transform-runtime'),
  //     { corejs: { version: 3, proposals: true } },
  //   ],
  // ],
};
