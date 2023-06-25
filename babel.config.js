module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin', {
      relativeSourceLocation: true,
    }],
    ['module-resolver',{
      root: '.',
      alias: {
        '@assets': './src/assets',
        '@components': './src/components',
        '@contexts': './src/contexts',
        '@routes': './src/routes',
        '@screens': './src/screens',
        '@utils': './src/utils'
      }
    }]
  ],
};
