import * as childProcess from 'child_process';

/**
 * Function for opening system native terminal with command for connection to the server
 *
 * @param command - command with server address
 */
const session = function (command: string): void {
  if (process.platform == 'win32') {
    childProcess.exec(`start cmd.exe /K ${command}`);
  }
  if (process.platform == 'darwin') {
    childProcess.exec(`osascript -e 'tell application "Terminal" to (do script "${command}") activate'`);
  }
  if (process.platform == 'linux') {
    const terminal = 'gnome-terminal';
    childProcess.spawn(terminal);
  }
};

export default session;
