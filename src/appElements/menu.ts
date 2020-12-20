import { Menu, MenuItem, MenuItemConstructorOptions } from 'electron';

/**
 *  Creates the system menu that will be displayed by right-arrow click on the app icon.
 *
 *  @returns { Menu }
 */
export default function createAppMenu(): Menu {
  /**
   * Menu element creating
   */
  const template: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      label: 'About',
      role: 'about',
    },
    {
      label: 'Quit',
      role: 'quit',
    },
  ];

  return Menu.buildFromTemplate(template);
}
