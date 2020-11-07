import electron from 'electron';

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({

  });
  mainWindow.loadURL(`${process.cwd()}/public/index.html`);
});