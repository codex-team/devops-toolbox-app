import { WindowPosition } from '@/utils/getWindowPosition';
import { BrowserWindow, Rectangle } from 'electron';

/**
 * @param windowPosition - place of the app window on the screen
 * @param win - app window
 * @param screenBounds - bounds of the screen
 */
export default function calcWindowBounds(windowPosition: WindowPosition, win: BrowserWindow, screenBounds: Rectangle):Partial<Rectangle> {
  const { x, y } = screenBounds;
  const { height, width } = win.getBounds();
  const xPosition = (windowPosition === 'trayBottomLeft')
    ? Math.round(x)
    : (windowPosition === ('trayBottomRight'))
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      ? Math.round(window.screen.width)
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      : Math.round(x - width / 2);
  const yPosition = windowPosition === ('trayCenter' || 'topRight') ? y : y - height;

  return {
    x: xPosition,
    y: yPosition,
    height,
    width,
  };
}
