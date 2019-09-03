var electron = require('electron');
const fs = require('fs');
var app = electron.app;
var ipcMain = electron.ipcMain;

console.log("LOGS: electron.app isReady=" + app.isReady());

process.send = process.send || function () {};
process.send('LOGS: electron.app isReady=: ' + app.isReady());

setTimeout(function(){ 
 if (app.isReady) {
  var win = new electron.BrowserWindow(
          {
              width: 1200,  //Current these settings are being overriden with win.maximize().  Just leaving them here for
              height: 1296 //reference
          });

  win.openDevTools();

      var d = new Date().getTime(); //'+d.toString()+'
      // and load the index.html of the app.
      //win.loadFile('index.html')
      // win.loadURL('http://kenmacpherson.com');
      win.loadURL('http://localhost:4200/');

      win.webContents.on('did-finish-load', () => {
            // Use default printing options
            console.log("did-finish-load ====");
            win.webContents.printToPDF({}, (error, data) => {
              if (error) throw error
              fs.writeFile('print-did-finish-load-'+d.toString()+'.pdf', data, (error) => {
                if (error) throw error
                console.log('Write PDF successfully.');
                setTimeout(function(){ app.quit(); },9500);
              })
            });
      })
    }
  }, 500);

  process.send('LOGS: jsLogInjector = executeJavaScript' );
  process.send("LOGS: " );

  var jsLogInjector = "(function () { var injector = angular.element(document.body).injector(); " +
  "  var ipc = require('electron').ipcRenderer; " +
  "  ipc.send('logs', 'hey sending log renderer'); " + 
  "})();";
win.webContents.executeJavaScript(jsLogInjector);

ipcMain.on('error', function(ev, error) {
  process.send('ERROR: ' + error);
});

ipcMain.on('logs', function(ev, logs) {
  process.send('LOGS: ' + logs);
});
