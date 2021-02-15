import { shell } from 'electron';

/**
 * Function for opening some url in the system default browser
 *
 * @param url - project that will open this function
 */
const openUrl = function (url: string): void {
  shell.openExternal(url);
};

export default openUrl;
