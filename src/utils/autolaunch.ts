import AutoLaunch from 'auto-launch';
import { logger } from '@/utils/logger';

/**
 * Auto launch app function
 * The app launch when you turn on PC
 */
export function autoLaunch(): void{
  const Toolbox = new AutoLaunch({
    name: 'DevOps Toolbox',
    path: '/Applications/DevOps Toolbox.app',
  });

  Toolbox.enable();

  Toolbox.isEnabled()
    .then((isEnabled: boolean) => {
      if (!isEnabled) {
        Toolbox.enable();
      }
    })
    .catch((err: Error) => {
      logger.error(err);
    });
}
