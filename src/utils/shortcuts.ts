import { globalShortcut } from 'electron';
import openSession from './session';
import Workspace from './../types/workspace';

/**
 * Function to turn on shortcuts (Ctrl+1,2..), which open servers in console
 *
 * @param workspaces - workspaces information
 */
export function enableShortcuts(workspaces: Workspace[]): void {
  const SHORTCUTS_MAX = 9;
  let SHORTCUTS_COUNT = 0;

  for (const workspace of workspaces) {
    for (const server of workspace.servers) {
      if (SHORTCUTS_COUNT < SHORTCUTS_MAX) {
        SHORTCUTS_COUNT++;
        globalShortcut.register(`CommandOrControl+${SHORTCUTS_COUNT}`, () => {
          if(server.sshConnectionInfo) {
            let command = `ssh ${server.sshConnectionInfo.username}@${server.sshConnectionInfo.ip}`;

            if (server.sshConnectionInfo.port) {
              command += ` -p ${server.sshConnectionInfo.port}`;
            }

            openSession(command);
          }
        });
      } else {
        return;
      }
    }
  }
}

/**
 * Function to turn off all shortcuts
 */
export function disableShortcuts(): void {
  globalShortcut.unregisterAll();
}
