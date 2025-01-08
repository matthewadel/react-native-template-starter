module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.ios.js', '.android.js', '.ts', '.tsx'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
