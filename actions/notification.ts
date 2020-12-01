import { Notification } from 'electron';

/**
 * Function for showing notification for
 *
 * @param message - Message which will be displayed in the notification
 */
function showNotification(message: string): void {
  const notification = {
    title: 'CodeX DevOps Toolbox',
    body: `${message}`,
    icon: `src/assets/images/front.png`,
  };

  new Notification(notification).show();
}

export default showNotification;
