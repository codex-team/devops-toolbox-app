import { WindowPosition } from '@/utils/getWindowPosition';
import { BrowserWindow, Rectangle, screen } from 'electron';

/**
 * @param windowPosition - place of the app window on the screen
 * @param win - app window
 * @param screenBounds - bounds of the screen
 */
export default function calcWindowBounds(windowPosition: WindowPosition, win: BrowserWindow, screenBounds: Rectangle):Partial<Rectangle> {
  const { x, y } = screenBounds;
  const { height, width } = win.getBounds();
  const display = screen.getPrimaryDisplay();
  const displayWidth = display.bounds.width;
  let xPosition;
  let yPosition;

  if (windowPosition === 'trayBottomLeft') {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    xPosition = Math.round(x + width * 0.5);
  } else if (windowPosition === 'trayBottomRight') {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    xPosition = Math.round(displayWidth - width * 1.5);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    xPosition = Math.round(x - width * 0.5);
  }
  if (windowPosition === 'trayCenter' && process.platform === 'darwin') {
    yPosition = y;
  } else if (windowPosition === 'trayCenter') {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    yPosition = y + Math.round(height * 0.1);
  } else {
    yPosition = y - height;
  }

  return {
    x: xPosition,
    y: yPosition,
    height,
    width,
  };
}
