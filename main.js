const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require('path');

let quitting = false;

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 420, height: 640, minWidth: 320, minHeight: 200,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    title: 'YouTube Music',
    icon: path.join(__dirname, 'icon.png'),
  });
  // Google refuse la connexion si le User-Agent contient "Electron"
  win.webContents.setUserAgent(win.webContents.getUserAgent().replace(/ Electron\/\S+/, ''));
  win.loadURL('https://music.youtube.com');

  // Fermer la fenêtre la réduit dans la zone de notification (la musique continue)
  win.on('close', (e) => { if (!quitting) { e.preventDefault(); win.hide(); } });

  const toggle = () => (win.isVisible() ? win.hide() : win.show());
  const menu = () => Menu.buildFromTemplate([
    { label: 'Afficher / Masquer', click: toggle },
    { label: 'Toujours au premier plan', type: 'checkbox', checked: win.isAlwaysOnTop(),
      click: (i) => win.setAlwaysOnTop(i.checked) },
    { label: 'Quitter', click: () => { quitting = true; app.quit(); } },
  ]);

  const tray = new Tray(path.join(__dirname, 'icon.png'));
  tray.setToolTip('YouTube Music');
  tray.on('click', toggle);
  tray.on('right-click', () => tray.popUpContextMenu(menu()));
  // Clic droit dans la fenêtre : même menu
  win.webContents.on('context-menu', () => menu().popup());
});
