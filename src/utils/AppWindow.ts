import { BrowserWindow, Tray } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import createAppMenu from '@/utils/menu';

/**
 * Tray element
 */
let tray: Tray;

/**
 * Protocol name
 */
const protocolName = 'app';

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
  const iconName = process.platform === 'win32' ? 'front.png' : 'front-mac.png';
  const iconPath = `src/assets/images/${iconName}`;

  tray = new Tray(iconPath);
  tray.setIgnoreDoubleClickEvents(true);
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

export default createWindow;
