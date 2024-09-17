module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./source'],
        alias: {
          api: './source/api',
          assets: './source/assets',
          components: './source/components',
          data_models: './source/data_models',
          hooks: './source/hooks',
          navigation: './source/navigation',
          screens: './source/screens',
          store: './source/store',
          utils: './source/utils',
          context: './source/context',
        },
      },
    ],
  ],
};
