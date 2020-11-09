import electron from 'electron';

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
});