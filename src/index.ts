const electron = require('electron');
const { app, BrowserWindow } = electron;
const path = require('path');

const { autoUpdater } = require('electron-updater');
const logger = require('electron-log');
logger.transports.file.level = 'info';
logger.transports.file.file = __dirname + '..' + 'log.log';
const url = require('url');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({

  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

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
  }, 60 * 1000);

});