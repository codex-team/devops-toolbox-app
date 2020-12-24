module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background.ts',
      nodeIntegration: true,
      builderOptions: {
        appId: 'so.codex.devops-toolbox',
        dmg: {
          title: 'DevOps Toolbox',
          icon: 'build/dmg/logo-disk.icns',
          background: 'build/dmg/background.png',
          iconSize: 128,
          window: {
            width: 600,
            height: 360,
          },
          contents: [
            {
              x: 172,
              y: 180,
            },
            {
              x: 428,
              y: 180,
              type: 'link',
              path: '/Applications',
            },
          ],
        },
        win: {
          target: 'nsis',
        },
        linux: {
          target: 'AppImage',
        },
      },
    },
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
