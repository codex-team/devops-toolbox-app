const electron = require('electron');
const { app, BrowserWindow } = electron;

const { autoUpdater } = require('electron-updater');
const logger = require('electron-log');
logger.transports.file.level = 'info';
logger.transports.file.file = __dirname + '..' + 'log.log';

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({

  });
  mainWindow.loadURL(`${process.cwd()}/public/index.html`);

  /**
   * Auto-updater
   */

  /**
   * Actions after a successful update download
   */
  autoUpdater.on('update-downloaded', (updateInfo: any) => {
    logger.log('Update is ready: ', updateInfo);
    autoUpdater.quitAndInstall();
  });

  /**
   * Regularly checking for updates (current interval: 10 min)
   */
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 10 * 60 * 1000);

});