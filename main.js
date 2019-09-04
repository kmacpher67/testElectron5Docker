var electron = require('electron');
const fs = require('fs');
var app = electron.app;
var ipcMain = electron.ipcMain;
const console = require('console');

setTimeout(function(){ 
    console.log("LOGS: 2222 console.log electron.app isReady 120ms=" + app.isReady());
}, 120);

process.send = process.send || function () {};
setTimeout(function(){ 
  process.send('LOGS: process.send electron.app isReady= ' + app.isReady());
  if (app.isReady()) {
    process.send('LOGS: createMainWindow(); is ready');
    app.console = new console.Console(process.stdout, process.stderr);
    createMainWindow();
  }
  else {
    console.log("NOT READY!!! ");
    process.send('LOGS: createMainWindow(); is NOT NOT ready');
  }
}, 120);

function createMainWindow() {
 if (app.isReady) {
  process.send('LOGS: ele.main.js: startng win = new electron.BrowserWindow');
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
      //win.loadURL('http://localhost:4200/');
      win.loadURL('http://localhost:8000/');

      win.webContents.on('did-finish-load', () => {
            // Use default printing options
            console.log("did-finish-load ====");
            win.webContents.printToPDF({}, (error, data) => {
              if (error) throw error
              fs.writeFile('print-did-finish-load-'+d.toString()+'.pdf', data, (error) => {
                if (error) throw error
                console.log('Write PDF successfully.');
                setTimeout(function(){ app.quit(); },19500);
              })
            });

            // not loaded? 
            var jsLogInjector = "(function () {  console.log('inside win.webContents.on( did-finish-load renderer injected code: jsLogInjector'); " +
            "  var ipc = require('electron').ipcRenderer;" +
            "  ipc.send('logs', 'hey this is FROM TEST INJECTED javascript code sending log renderer'); " + 
            "})();";
            win.webContents.executeJavaScript(jsLogInjector);
      })
    }

    process.send('LOGS: jsLogInjector = executeJavaScript' );
    process.send("LOGS: before injector code 1 logs render" );

    var jsLogInjector = "(function () {  console.log('STARTING 11111 AFTER on did-finsih  renderer injected code: jsLogInjector'); " +
    "  var ipc = require('electron').ipcRenderer; " +
    "  ipc.send('logs', 'hey this is FROM TEST INJECTED javascript code sending log renderer'); " + 
    "})();";
    win.webContents.executeJavaScript(jsLogInjector);


    // var jsLogInjector = "(function () {  var app = angular.module('appRoot',[]);  " +
    // "    var injector = angular.element(document.body).injector(); " +
    // "  var ipc = require('electron').ipcRenderer; " +
    // "  ipc.send('logs', 'hey this is FROM TEST INJECTED javascript code sending log renderer'); " + 
    // "})();";
    // win.webContents.executeJavaScript(jsLogInjector);

    // var jsLogInjector = "(function () { var injector = angular.element(document.body).injector(); " +
    // "  var ipc = require('electron').ipcRenderer; " +
    // "  var $log = injector.get('$log'); " +
    // "  var log = $log.debug; " +
    // "  $log.debug = function () { " +
    // "    ipc.send('logs', Array.prototype.slice.call(arguments)); log.apply(this, Array.prototype.slice.call(arguments));" +
    // "  }; " +
    // "})();";
    // win.webContents.executeJavaScript(jsLogInjector);

    // var jsLogInjectorError = "(function () { var injector = angular.element(document.body).injector(); " +
    // "  var ipc = require('electron').ipcRenderer; " +
    // "  var $log = injector.get('$log'); " +
    // "  var log = $log.error; " +
    // "  $log.error = function () { " +
    // "    ipc.send('error', Array.prototype.slice.call(arguments)); log.apply(this, Array.prototype.slice.call(arguments));" +
    // "  }; " +
    // "})();";
    // win.webContents.executeJavaScript(jsLogInjectorError);

};// of createmainWindow function!!


ipcMain.on('error', function(ev, error) {
  process.send('ERROR: from renderer-' + error);
});

ipcMain.on('logs', function(ev, logs) {
  process.send('LOGS: from renderer-'+ logs);
});
