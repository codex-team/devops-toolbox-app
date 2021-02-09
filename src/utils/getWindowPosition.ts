/**
 * Utilities to get taskbar position and consequently menubar's position
 */
import { Rectangle, screen as electronScreen, Tray } from 'electron';

/**
 * Returns bounds of closest display to tray
 *
 * @param tray - The Electron Tray instance.
 */
const trayToScreenRects = (tray: Tray): [Rectangle, Rectangle] => {
  /**
   * There may be more than one screen, so we need to figure out on which screen our tray icon lives.
   */
  const {
    workArea,
    bounds: screenBounds,
  } = electronScreen.getDisplayMatching(tray.getBounds());

  workArea.x -= screenBounds.x;
  workArea.y -= screenBounds.y;

  return [screenBounds, workArea];
};

/**
 * Type for describing the location of the taskbar on the screen(windows & linux)
 */
type TaskbarLocation = 'top' | 'bottom' | 'left' | 'right';

/**
 * Determine taskbar location: "top", "bottom", "left" or "right".
 *
 * Only tested on Windows for now, and only used in Windows.
 *
 * @param tray - The Electron Tray instance.
 */
export function taskbarLocation(tray: Tray): TaskbarLocation {
  const [screenBounds, workArea] = trayToScreenRects(tray);

  /**
   * TASKBAR LEFT
   */
  if (workArea.x > 0) {
    /**
     * The workspace starts more on the right
     */
    return 'left';
  }

  /**
   * TASKBAR TOP
   */
  if (workArea.y > 0) {
    return 'top';
  }

  /**
   * TASKBAR RIGHT
   *  Here both workArea.y and workArea.x are 0 so we can no longer leverage them.
   *  We can use the workarea and display width though.
   *  Determine taskbar location
   */
  if (workArea.width < screenBounds.width) {
    /**
     * The taskbar is either on the left or right, but since the LEFT case was handled above,
     * we can be sure we're dealing with a right taskbar
     */
    return 'right';
  }

  /**
   *  TASKBAR BOTTOM
   * Since all the other cases were handled, we can be sure we're dealing with a bottom taskbar
   */
  return 'bottom';
}

/**
 * Type for describing window position on the screen depends on tray location(windows & linux)
 */
export type WindowPosition = 'trayCenter'
  | 'topRight'
  | 'trayBottom'
  | 'trayBottomLeft'
  | 'trayBottomRight';

/**
 * Depending on where the taskbar is, determine where the window should be
 * positioned.
 *
 * @param tray - The Electron Tray instance.
 */
export function getWindowPosition(tray: Tray): WindowPosition {
  switch (process.platform) {
    /**
     * macOS
     * Supports top taskbars
     */
    case 'darwin':
      return 'trayCenter';
    /**
     * Windows and Linux
     * Supports top/bottom/left/right taskbar, default bottom
     */
    default: {
      const traySide = taskbarLocation(tray);

      /**
       * Assign position for menubar
       */
      if (traySide === 'top') {
        return 'trayCenter';
      }
      if (traySide === 'bottom') {
        return 'trayBottom';
      }
      if (traySide === 'left') {
        return 'trayBottomLeft';
      }
      if (traySide === 'right') {
        return 'trayBottomRight';
      }
    }
  }

  /**
   * When we really don't know, we just show the menubar on the top-right
   */
  return 'topRight';
}
