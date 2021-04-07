import {BrowserWindow, globalShortcut, ipcMain} from 'electron';
import openSession from './session';
import Workspace from './../types/workspace';
import Server from './../types/server';

/**
 * Actual workspaces for update shortcuts
 * Updated with updating workspaces information
 */
let actualWorkspaces: Workspace[];

let window: BrowserWindow;

/**
 * Bind opening ssh server connection to 'Ctrl/Cmd + 1,2..' shortcuts
 *
 * @param server - server variable with server connection info (username, port, etc.)
 * @param numeric - number of the regular numeric for the next shortcut
 */
function bindServerConnectionShortcutKeys(server: Server, numeric: number): void {
  globalShortcut.register(`CommandOrControl+${numeric}`, () => {
    if (server.sshConnectionInfo) {
      let command = `ssh ${server.sshConnectionInfo.username}@${server.sshConnectionInfo.ip}`;

      if (server.sshConnectionInfo.port) {
        command += ` -p ${server.sshConnectionInfo.port}`;
      }

      openSession(command);
    }
  });
}

/**
 * Function to turn on shortcuts, which open servers in console
 *
 * @param workspaces - workspaces information, updated by api
 */
export function enableServerConnectionShortcuts(workspaces: Workspace[]): void {
  const SHORTCUTS_MAX = 9;
  let SHORTCUTS_COUNT = 0;

  if (workspaces) {
    for (const workspace of workspaces) {
      for (const server of workspace.servers) {
        if (!server.sshConnectionInfo) {
          continue;
        }
        if (SHORTCUTS_COUNT < SHORTCUTS_MAX) {
          SHORTCUTS_COUNT++;
          bindServerConnectionShortcutKeys(server, SHORTCUTS_COUNT);
        } else {
          return;
        }
      }
    }
  }
}

/**
 * Initialize window in shortcuts file
 * Needs for tracking opening and closing the app window for handling shortcuts
 *
 * @param win - BrowserWindow from main process
 */
export function initShortcutsWindow(win: BrowserWindow): void {
  window = win;

  window.on('focus', () => {
    enableServerConnectionShortcuts(actualWorkspaces);
  });
}

ipcMain.on('shortcuts-update', (event, data) => {
  actualWorkspaces = data;
});

/**
 * Turn off all shortcuts
 */
export function disableShortcuts(): void {
  globalShortcut.unregisterAll();
}
