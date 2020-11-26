import { app, protocol, BrowserWindow, Tray } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

/**
 * Tray element
 */
let tray: Tray;
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
  const win: BrowserWindow = new BrowserWindow({
    height: 352,
    width: 260,
    frame: false,
    resizable: false,
    show: false,
    transparent: true,
    type: 'textured',
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
  const iconName = process.platform === 'win32' ? 'front.png' : 'front-mac.png';
  const iconPath = `src/assets/images/${iconName}`;

  tray = new Tray(iconPath);
  tray.on('click', (event, bounds) => {
    // click event bounds
    const { x, y } = bounds;
    // window height and width
    const { height, width } = win.getBounds();

    if (win.isVisible()) {
      win.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;

      win.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });
      win.show();
    }
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
