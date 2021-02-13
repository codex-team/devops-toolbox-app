import { shell } from 'electron';

/**
 * Function for opening project in the system default browser
 *
 * @param projectName - project that will open this function
 */
const openProject = function (projectName: string): void {
  shell.openExternal('https://' + projectName);
};

export default openProject;
