const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendVersion: () => ipcRenderer.send('version'),
    askMatchs: (profil) => ipcRenderer.send('askMatchs', profil)
});

ipcRenderer.on('version', (e, data) => {
    if (document.getElementById('app-version')) document.getElementById('app-version').innerText += ' ' + data;
});