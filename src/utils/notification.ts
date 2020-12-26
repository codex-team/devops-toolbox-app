import { app, Notification } from 'electron';
import path from 'path';

/**
 * Function for showing notification
 *
 * @param message - Message which will be displayed in the notification
 */
function showNotification(message: string): void {
  const notification = {
    title: `${app.getName()}`,
    body: `${message}`,
    icon: path.join(__static, 'icons', 'app-icon.png'),
  };

  new Notification(notification).show();
}

export default showNotification;
