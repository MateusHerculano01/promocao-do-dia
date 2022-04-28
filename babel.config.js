module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
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
          '@assets': './src/assets',
          '@components': './src/components',
          '@global': './src/global',
          '@hooks': './src/hooks',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
        }
      }
    ]
  ]
};
