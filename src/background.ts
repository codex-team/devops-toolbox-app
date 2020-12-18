import { app, protocol, BrowserWindow, Tray, Menu, MenuItemConstructorOptions, MenuItem } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import notify from './utils/notification';
import { logger } from './utils/logger';
import path from 'path';

/**
 * Tray element
 */
let tray: Tray;

/**
 *  Creates the system menu that will be displayed by right-arrow click on the app icon.
 *
 *  @returns { Menu }
 */
function createAppMenu(): Menu {
  /**
   * Menu element creating
   */
  const template: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      label: 'About',
      role: 'about',
    },
    {
      label: 'Quit',
      role: 'quit',
    },
  ];

  return Menu.buildFromTemplate(template);
}
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
    height: 352,
    width: 260,
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

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol(protocolName);
    await win.loadURL(`${protocolName}://./index.html`);
  }

  const trayIconPath = path.join(__static, 'tray-icon.png');

  tray = new Tray(trayIconPath);
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = win.getBounds();

    if (win.isVisible()) {
      win.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;

      win.setBounds({
        x: Math.round(x - width / 2),
        y: yPosition,
        height,
        width,
      });
      win.show();
    }
  });

  const menu = createAppMenu();

  tray.on('right-click', () => {
    tray.popUpContextMenu(menu);
  });
}

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
    await createWindow();

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

process.on("uncaughtException", (err) => {
  logger.error(err);
  throw err;
});
