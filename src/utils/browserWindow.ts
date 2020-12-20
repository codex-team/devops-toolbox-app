import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

/**
 * Protocol name
 */
const protocolName = 'app';

/**
 * Creating BrowserWindow
 *
 * @param options
 */
export default async function createWindow(options: BrowserWindowConstructorOptions): Promise<BrowserWindow> {
  const window: BrowserWindow = new BrowserWindow(options);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
  } else {
    createProtocol(protocolName);
    await window.loadURL(`${protocolName}://./index.html`);
  }

  return window;
};
