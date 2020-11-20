module.exports = {
  pluginOptions: {
    electronBuilder: {
      disableMainProcessTypescript: false,
      mainProcessTypeChecking: false,
      builderOptions: {
        files: [
          'src/**',
          'public/**',
          'package.json',
          'node_modules',
        ],
        win: {
          target: 'nsis',
        },
      },
    },
  },
};
