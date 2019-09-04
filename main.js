var electron = require('electron');
var app = electron.app;
var ipcMain = electron.ipcMain;
var app = electron.app;
const { netLog } = require('electron')
const fs = require('fs');
var createdWindow=false;
var printedPDF=false;

console.log("run with export ELECTRON_ENABLE_LOGGING=true for renderer logs = " + process.env.ELECTRON_ENABLE_LOGGING);

process.enablePromiseAPIs=true;

setTimeout(function(){ 
    console.log("LOGS: 2222 console.log electron.app isReady 120ms=" + app.isReady());
}, 120);

process.send = process.send || function () {};
setTimeout(function(){ 
  process.send('LOGS: process.send electron.app isReady= ' + app.isReady());
  if (app.isReady() && !createdWindow) {
    process.send('LOGS: createMainWindow(); is ready');
    createMainWindow();
  }
  if (createdWindow) { 
    console.log("createMainWindow(); Already fired before setTimeout event! ");
    process.send('LOGS: createMainWindow(); Already fired before setTimeout event! ');
  }
  else {
    console.log("NOT READY!!! ");
    process.send('LOGS: createMainWindow(); is NOT NOT ready');
  }
}, 120);

function createMainWindow() {
  console.log("main.js - createMainWindow() before.")
  netLog.startLogging('/home/kenmac/dev-ui/testElectron5/net-log-'+new Date().toTimeString());
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
        process.send('did-finish-load: ele.main.js:= win. printedPDF');
            // Use default printing options
            setTimeout(function(){
                console.log("did-finish-load ====");
                if (!printedPDF) {
                  console.log("PRINTING PDF per did-finish-load  ====");
                  printedPDF=true;
                  printPDF("did-finish-load");
                }  
              }, 200);

            // not loaded? 
            var jsLogInjector = "(function () {  console.log('inside win.webContents.on( did-finish-load renderer injected code: jsLogInjector'); " +
            // "  var ipc = require('electron').ipcRenderer;" +
            // "  ipc.send('logs', 'hey this is FROM TEST INJECTED javascript code sending log renderer'); " + 
            "})();";
            win.webContents.executeJavaScript(jsLogInjector);
      })

      // win.webContents.on('pr-ready-to-print-event', (event, level, message, line, sourceId) => {
      //   console.log("pr-ready-to-print-event: occurred from main.js event=" + event);
      //   console.log("pr-ready-to-print-event: occurred from main.js level=" + level);
      //   console.log("pr-ready-to-print-event: occurred from main.js message=" + message);
      //   console.log("pr-ready-to-print-event: occurred from main.js line=" + line);
      //   console.log("pr-ready-to-print-event: occurred from main.js sourceId=" + sourceId);
      //   process.send("pr-ready-to-print-event: message=" + message);
      // });

      win.webContents.on('console-message', (event, level, message, line, sourceId) => {
        // console.log("console-message: occurred from main.js event=" + event);
        // console.log("console-message: occurred from main.js level=" + level);
        // console.log("console-message: occurred from main.js message=" + message);
        // console.log("console-message: occurred from main.js line=" + line);
        // console.log("console-message: occurred from main.js sourceId=" + sourceId);
        process.send("console-message: " + message);
        if (!printedPDF && message.includes("pr-ready-to-print-event")) {
          console.log("PRINTING PDF per ready to print event!!!");
          printedPDF=true;
          printPDF('pr-ready-to-print-event');
        }
      });

      win.webContents.on('ipc-message', (event, channel, args) => {
        console.log("ipc-message: occurred from main.js event=" + JSON.stringify(event));
        console.log("ipc-message: occurred from main.js channel=" + channel);
        console.log("ipc-message: occurred from main.js args=" + args);
        process.send("ipc-message: event=" + event);
      });

    }

    function printPDF(filenamePrePackcage) {
      win.webContents.printToPDF({}, (error, data) => {
        if (error) throw error
        fs.writeFile(filenamePrePackcage+'-'+d.toString()+'.pdf', data, (error) => {
          if (error) throw error
          console.log('Write PDF successfully.' + filenamePrePackcage);
          setTimeout(function(){ app.quit(); },19500);
        })
      });
    }

    process.send('LOGS: jsLogInjector = executeJavaScript' );
    process.send("LOGS: before injector code 1 logs render" );

    var jsLogInjector = "(function () {  console.log('STARTING 11111 AFTER on did-finsih  renderer injected code: jsLogInjector'); " +
    // "  var ipc = require('electron').ipcRenderer; " +
    // "  ipc.send('logs', 'hey this is FROM TEST INJECTED javascript code sending log renderer'); " + 
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

};// of createMainWindow function!!

app.on('ready', async function () {
  filename = process.argv.pop();  //get the filename with UUID

  if (!createdWindow) {
    createdWindow=true;
    process.send('logs: createMainWindow(); is ready from app.on(ready, function() ');
    createMainWindow();
  }
  console.log("this is the createdWinow empty log")
  process.send("process.send createdWindow end:");
});

ipcMain.on('error', function(ev, error) {
  process.send('ERROR: from renderer-' + error);
});

ipcMain.on('logs', function(ev, logs) {
  process.send('LOGS: from renderer-'+ logs);
});

process.on('message', function(config) {
  _config = config;
  console.log("message, function(config) occurred");
  process.send("message:");
  createMainWindow();
});

console.log = function (message) {
  process.send("LOGS: " + message);
}
console.error = function (message) {
  process.send("ERROR: " + message);
}