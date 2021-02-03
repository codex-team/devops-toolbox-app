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
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const dockHeight = Math.round(height * 0.1);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const dockWidth = width * 0.5;

  if (windowPosition === 'trayBottomLeft') {
    xPosition = Math.round(x + dockWidth);
  } else if (windowPosition === 'trayBottomRight') {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    xPosition = Math.round(displayWidth - width + dockWidth);
  } else {
    xPosition = Math.round(x - dockWidth);
  }
  if (windowPosition === 'trayCenter' && process.platform === 'darwin') {
    yPosition = y;
  } else if (windowPosition === 'trayCenter') {
    yPosition = y + dockHeight;
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
