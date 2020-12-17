import { BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

/**
 * Protocol name
 */
const protocolName = 'app';

/**
 * Creating BrowserWindow
 */
export default async function createWindow(): Promise<BrowserWindow> {
  const window: BrowserWindow = new BrowserWindow({
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
    await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol(protocolName);
    await window.loadURL(`${protocolName}://./index.html`);
  }

  return window;
};
