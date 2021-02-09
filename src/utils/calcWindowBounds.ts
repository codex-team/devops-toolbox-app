import { WindowPosition } from '@/utils/getWindowPosition';
import {BrowserWindow, Rectangle, screen as electronScreen, screen, Tray} from 'electron';

/**
 * @param windowPosition - place of the app window on the screen
 * @param win - app window
 * @param screenBounds - bounds of the screen
 * @param tray
 */
export default function calcWindowBounds(windowPosition: WindowPosition, win: BrowserWindow, screenBounds: Rectangle, tray: Tray):Partial<Rectangle> {
  const { x, y } = screenBounds;
  const { height, width } = win.getBounds();
  const display = screen.getPrimaryDisplay();
  const displayWidth = display.bounds.width;
  const displayHeight = display.bounds.height;
  const { workArea } = electronScreen.getDisplayMatching(tray.getBounds());
  let xPosition;
  let yPosition;
  const topIndent = 10;
  const sideIndent = 5;
  const dockHeight = Math.abs(workArea.height - displayHeight);
  const dockWidth = Math.abs(workArea.width - displayWidth);

  if (windowPosition === 'trayBottomLeft') {
    xPosition = Math.round(dockWidth + sideIndent);
  } else if (windowPosition === 'trayBottomRight') {
    xPosition = Math.round(displayWidth - (width + dockWidth + sideIndent));
  } else {
    xPosition = Math.round(x - dockWidth);
  }
  if (windowPosition === 'trayCenter' && process.platform === 'darwin') {
    console.log(displayWidth, displayHeight, workArea);
    yPosition = y + (workArea.y + topIndent);
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
