import AutoLaunch from 'auto-launch';
import { app } from 'electron';

/**
 * The app name
 */
const appName = app.getName();

/**
 * Auto launch instance
 */
const autoLaunch = new AutoLaunch({
  name: appName,
});

/**
 * The function to enable auto launch
 */
export function enableAutoLaunch(): void {
  autoLaunch.enable();
}

/**
 * The function to toggle auto launch state.
 * In the future we'll create settings and user can turn off auto launch
 */
export function autoLaunchToggle(): void {
  autoLaunch.isEnabled()
    .then(async (isEnabled: boolean) => {
      if (isEnabled) {
        await autoLaunch.disable();
      } else {
        await autoLaunch.enable();
      }
    });
}
