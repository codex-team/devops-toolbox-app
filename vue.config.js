module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/index.ts',
      nodeIntegration: true,
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
