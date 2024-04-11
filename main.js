const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');

const url = require('url')

const path = require('path')

var mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        // autoHideMenuBar: true,
        // titleBarStyle: 'hidden',
        title: 'keithley',
        width: 500,
        height: 620,

        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'electron/preload.js')
        }
    });

    const startUrl = url.format({

        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file'
    });

    mainWindow.loadURL('http://localhost:3000/');
    // spawn(`app.py`, { detached: false, shell: true, stdio: 'inherit' });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
}

app.whenReady().then(createMainWindow);

var login = false
var uid = ""

ipcMain.on('change_size', (event, args) => {
    mainWindow.setSize(args.width, args.height)
})

ipcMain.on('userLogin', (event, args) => {
    login = args.login
    uid = args.uid
    console.log(login, uid, "****");
})

ipcMain.on('isUserLogin', (event, args) => {
    mainWindow.webContents.send('UserUid', { 'login': login, 'uid': uid })
})
ipcMain.on('new_win', (event, args) => {
    const newWindow = new BrowserWindow({
        // autoHideMenuBar: true,
        // titleBarStyle: 'hidden',
        title: 'keithley',
        width: 500,
        height: 620,

        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'electron/preload.js')
        }
    });
    newWindow.loadURL("http://localhost:3000/graph")
})