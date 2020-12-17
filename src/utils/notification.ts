import { Notification } from 'electron';
import path from 'path';

/**
 * Function for showing notification
 *
 * @param message - Message which will be displayed in the notification
 */
function showNotification(message: string): void {
  const notification = {
    title: 'CodeX DevOps Toolbox',
    body: `${message}`,
    icon: path.join(__static, 'icon24x24.png'),
  };

  new Notification(notification).show();
}

export default showNotification;
