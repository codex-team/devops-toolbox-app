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
  const topIndent = 10;
  const sideIndent = 5;
  const dockHeight = 40;
  const dockWidth = 124;

  if (windowPosition === 'trayBottomLeft') {
    xPosition = Math.round(dockWidth + sideIndent);
  } else if (windowPosition === 'trayBottomRight') {
    xPosition = Math.round(displayWidth - (width + dockWidth + sideIndent));
  } else {
    xPosition = Math.round(x - dockWidth);
  }
  if (windowPosition === 'trayCenter' && process.platform === 'darwin') {
    yPosition = y + topIndent;
  } else if (windowPosition === 'trayCenter') {
    yPosition = y + (dockHeight + topIndent);
  } else {
    yPosition = y - (height + topIndent);
  }

  return {
    x: xPosition,
    y: yPosition,
    height,
    width,
  };
}
