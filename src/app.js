const {app, BrowserWindow} = require('electron');
const path = require('path');
const logger = require('electron-log');
const ipc = require("electron").ipcMain;

const DeltaUpdater = require("@electron-delta/updater");

let mainWindow;

const createWindow = () => {
    const window = new BrowserWindow({
        icon: path.join(__dirname, '/icon.ico'),
        backgroundColor: '#8E54E9',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            plugins: true
        }
    });

    window.on('closed', () => {
        mainWindow = null
    });

    window.loadFile(path.join(__dirname, 'index.html'));
    window.maximize();
    window.webContents.openDevTools();

    return window;
};

app.whenReady().then(async () => {
    const deltaUpdater = new DeltaUpdater({
        logger,
        autoUpdater: require("electron-updater").autoUpdater,
    });
    try {
        await deltaUpdater.boot({
            splashScreen: true
        });
    } catch (error) {
        logger.error(error);
    }

    mainWindow = createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createWindow();
    }
});

ipc.on('version', event => {
    event.sender.send('version', app.getVersion());
});

ipc.on('askMatchs', (event, data) => {
    const profil = JSON.parse(data);
    console.log(profil);
    const nbPairs= Math.floor(profil.players.length / 2);
    const nbPlayersLeft = profil.players.length % 2;
    const pairsPerTerrain = nbPairs / profil.terrains;

    console.log(nbPairs, pairsPerTerrain);


});

