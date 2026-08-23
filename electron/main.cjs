'use strict';

const { app, BrowserWindow, ipcMain, dialog, shell, session } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 980,
    minHeight: 680,
    show: false,
    backgroundColor: '#f1f5f9',
    title: 'Gestão de Clientes',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  ipcMain.handle('print-pdf', async (_event, html) => {
    if (!mainWindow) return { ok: false, error: 'Janela indisponível.' };
    try {
      const reportWindow = new BrowserWindow({
        show: false,
        parent: mainWindow,
        webPreferences: { contextIsolation: true, nodeIntegration: false }
      });
      await reportWindow.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(String(html || '')));
      const pdf = await reportWindow.webContents.printToPDF({
        printBackground: true,
        landscape: true,
        marginsType: 0,
        pageSize: 'A4'
      });
      reportWindow.close();
      const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
        title: 'Salvar backup em PDF',
        defaultPath: path.join(app.getPath('documents'), `clientes-backup-${new Date().toISOString().slice(0, 10)}.pdf`),
        filters: [{ name: 'Documento PDF', extensions: ['pdf'] }]
      });
      if (canceled || !filePath) return { ok: false, canceled: true };
      fs.writeFileSync(filePath, pdf);
      return { ok: true, filePath };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  });

  ipcMain.handle('export-backup', async () => {
    if (!mainWindow) return { ok: false, error: 'Janela indisponível.' };
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Salvar backup dos dados',
      defaultPath: path.join(app.getPath('documents'), `clientes-backup-${new Date().toISOString().slice(0, 10)}.json`),
      filters: [{ name: 'Backup JSON', extensions: ['json'] }]
    });
    if (canceled || !filePath) return { ok: false, canceled: true };
    return { ok: true, filePath };
  });

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
