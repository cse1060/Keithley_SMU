const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');

const url = require('url')

const path = require('path')

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'keithley',
        width: 1000,
        height: 600
    });

    const startUrl = url.format({

        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file'
    });

    mainWindow.loadURL('http://localhost:3000/');
    spawn(`app.py`, { detached: true, shell: true, stdio: 'inherit' });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
}

app.whenReady().then(createMainWindow);