'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isDesktop: true,
  printPdf: (html) => ipcRenderer.invoke('print-pdf', html),
  exportBackup: () => ipcRenderer.invoke('export-backup')
});
