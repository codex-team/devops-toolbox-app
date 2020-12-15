import * as childProcess from 'child_process';

/**
 * Function for opening system native terminal with command for connection to the server
 *
 * @param command - command with server address
 */
const session = function (command: string): void {
  switch (process.platform) {
    case 'win32':
      childProcess.exec(`start cmd.exe /K ${command}`);
      break;
    case 'darwin':
      childProcess.exec(`osascript -e 'tell application "Terminal" to (do script "${command}") activate'`);
      break;
    case 'linux':
      childProcess.spawn('gnome-terminal');
      break;
  }
};

export default session;
