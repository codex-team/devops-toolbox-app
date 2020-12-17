import { BrowserWindow, Tray } from 'electron';
import createAppMenu from '@/electronComponents/menu';
import createWindow from '@/electronComponents/browserWindow';

/**
 * Tray element creating
 */
export default async function createTray(): Promise<Tray> {
  const iconName = process.platform === 'win32' ? 'front.png' : 'front-mac.png';
  const iconPath = `src/assets/images/${iconName}`;
  /**
   * Menu element creating
   */
  const menu = createAppMenu();
  const tray: Tray = new Tray(iconPath);
  const window: BrowserWindow = await createWindow();

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
