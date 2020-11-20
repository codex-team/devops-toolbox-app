import { app, protocol, BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { autoUpdater } from 'electron-updater';
import logger from 'electron-log';

logger.transports.file.level = 'info';

/**
 * Node environment
 */
const isDevelopment = process.env.NODE_ENV !== 'production';
/**
 * Protocol name
 */
const protocolName = 'app';

/**
 * Scheme must be registered before the app is ready
 */
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true,
    },
  },
]);

/**
 * Creating window
 */
async function createWindow(): Promise<void> {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
  } else {
    createProtocol(protocolName);
    await win.loadURL(`${protocolName}://./index.html`);
  }
}

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
  autoUpdater.on('update-downloaded', () => {
    // logger.log('Update is ready: ', updateInfo);
    autoUpdater.quitAndInstall();
  });

  /**
   * Regularly checking for updates (current interval: 10 min)
   */
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 60 * 1000);

/**
 * Quit when all windows are closed.
 * On macOS it is common for applications and their menu bar
 * to stay active until the user quits explicitly with Cmd + Q
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * On macOS it's common to re-create a window in the app when the
 * dock icon is clicked and there are no other windows open.
 */
app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  await createWindow();
});

/**
 * Exit cleanly on request from parent process in development mode.
 */
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
