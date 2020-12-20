import { BrowserWindow, Tray } from 'electron';
import createAppMenu from '@/appElements/menu';

/**
 * Tray element creating
 *
 * @param window - window, which will appear on tray click event
 */
export default async function createTray(window: BrowserWindow): Promise<Tray> {
  const iconName = process.platform === 'win32' ? 'front.png' : 'front-mac.png';
  const iconPath = `src/assets/images/${iconName}`;
  /**
   * Menu element creating
   */
  const menu = createAppMenu();
  const tray = new Tray(iconPath);

  tray.on('right-click', () => {
    tray.popUpContextMenu(menu);
  });

  tray.setIgnoreDoubleClickEvents(true);
  tray.on('click', (event, bounds) => {
    const { x, y } = bounds;
    const { height, width } = window.getBounds();

    if (window.isVisible()) {
      window.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;

      window.setBounds({
        x: Math.round(x - width / 2),
        y: yPosition,
        height,
        width,
      });
      window.show();
    }
  });

  return tray;
}
