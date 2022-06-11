module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json'
          ],
          alias: {
            '@types': './src/@types',
            '@assets': './src/assets',
            '@components': './src/components',
            '@dtos': './src/dtos',
            '@global': './src/global',
            '@hooks': './src/hooks',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            '@utils': './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ]
  };
};
