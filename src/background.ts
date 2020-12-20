import { app, protocol, BrowserWindow } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import notify from './utils/notification';
import createTray from '@/appElements/tray';
import createWindow from '@/utils/browserWindow';
import { logger } from './utils/logger';
import path from 'path';

let window;

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
let tray;
/**
 * Node environment
 */
const isDevelopment = process.env.NODE_ENV !== 'production';

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
    window = await createWindow({
      height: 352,
      width: 260,
      icon: path.join(__static, 'app-icon.png'),
      frame: false,
      resizable: false,
      show: false,
      transparent: true,
      vibrancy: 'dark',
      visualEffectState: 'active',
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });
    tray = await createTray(window);
  }
});

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.on('ready', async () => {
  if (app.dock) {
    app.dock.hide();
  }

  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  try {
    logger.info('Starting...');
    window = await createWindow({
      height: 352,
      width: 260,
      icon: path.join(__static, 'app-icon.png'),
      frame: false,
      resizable: false,
      show: false,
      transparent: true,
      vibrancy: 'dark',
      visualEffectState: 'active',
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tray = await createTray(window);
    /**
     * Sets AppUserModelID for application on windows for development use.
     * It shows e.g. in notifications.
     */
    if (process.platform === 'win32') {
      app.setAppUserModelId('so.codex.devops-toolbox');
    }

    notify('DevOps Toolbox is running...');

    logger.info('App is ready');
  } catch (error) {
    logger.error(error);

    app.quit();
  }
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

/**
 * Catch uncaught exceptions
 */
process.on('uncaughtException', (err) => {
  logger.error(err);
  throw err;
});
