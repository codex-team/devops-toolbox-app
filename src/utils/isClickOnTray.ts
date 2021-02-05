import { screen, Tray } from 'electron';

/**
 *  Returns if click was on tray
 *
 * @param tray - tray that we are using
 */
export default function isClickOnTray(tray: Tray): boolean {
  const trayBounds = tray.getBounds();
  const cursorBounds = screen.getCursorScreenPoint();

  return (trayBounds.x > cursorBounds.x || trayBounds.x + trayBounds.width < cursorBounds.x || trayBounds.y > cursorBounds.y || trayBounds.y + trayBounds.height < cursorBounds.y);
}
