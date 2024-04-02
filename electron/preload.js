const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');

contextBridge.exposeInMainWorld('session', {
    uid: (callback) => ipcRenderer.on('UserUid', (callback))
})

contextBridge.exposeInMainWorld('ipcRenderer', {

    send: (channel, data) => ipcRenderer.send(channel, data),

    on: (channel, func) =>
        ipcRenderer.on(channel, func)

})