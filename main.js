const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('./bot/index'); // Inicia o bot automaticamente

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);