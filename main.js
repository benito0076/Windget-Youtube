const { app, BrowserWindow, Menu } = require('electron');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 420, height: 640, minWidth: 320, minHeight: 200,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    title: 'YouTube Music',
  });
  // Google refuse la connexion si le User-Agent contient "Electron"
  win.webContents.setUserAgent(win.webContents.getUserAgent().replace(/ Electron\/\S+/, ''));
  win.loadURL('https://music.youtube.com');
  // Clic droit : épingler / désépingler (toujours au premier plan)
  win.webContents.on('context-menu', () => Menu.buildFromTemplate([
    { label: 'Toujours au premier plan', type: 'checkbox', checked: win.isAlwaysOnTop(),
      click: (i) => win.setAlwaysOnTop(i.checked) },
    { label: 'Quitter', click: () => app.quit() },
  ]).popup());
});

app.on('window-all-closed', () => app.quit());
