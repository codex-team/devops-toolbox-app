import AutoLaunch from 'auto-launch';
import { app } from 'electron';

/**
 * The path to app
 */
const appPath = app.getPath('exe').replace(/\.app\/Content.*/, '.app');

/**
 * The app name
 */
const appName = app.getName();

/**
 * Auto launch instance
 */
const launch = new AutoLaunch({
  name: appName,
  path: appPath,
});

/**
 * Toggle launch state
 */
export function toggle(): void {
  launch.isEnabled()
    .then((isEnabled: boolean) => {
      if (isEnabled) {
        launch.disable();
      } else {
        launch.enable();
      }
    });
}
