var electron = require('electron');
var app = electron.app;
var ipcMain = electron.ipcMain;
var app = electron.app;
const { netLog } = require('electron')
const fs = require('fs');
var createdWindow=false;
var printedPDF=false;
var loggedIn=false;
var loginRetry=0;

console.log("run with export ELECTRON_ENABLE_LOGGING=true for renderer logs = " + process.env.ELECTRON_ENABLE_LOGGING);

process.enablePromiseAPIs=true;

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
}, 20);

function createMainWindow() {
  console.log("main.js - createMainWindow() before.")
  netLog.startLogging('/home/kenmac/dev-ui/testElectron5/net-log-'+new Date().getTime());
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
      win.loadURL('http://localhost:4200/');
      //win.loadURL('http://localhost:8000/');

      win.webContents.on('did-finish-load', () => {
        process.send('did-finish-load: ele.main.js:= win. printedPDF');

            // not loaded? 
            var jsLogInjector = "(function () {  console.log('inside win.webContents.on( did-finish-load renderer injected code: jsLogInjector'); " +
            // "  var ipc = require('electron').ipcRenderer;" +
            // "  ipc.send('logs', 'hey this is FROM TEST INJECTED javascript code sending log renderer'); " + 
            "})();";
            win.webContents.executeJavaScript(jsLogInjector);

            if (!loggedIn) {
              loginApp();
            }
      });

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
          console.log("PRINTING PDF!!! per ready to print event!!!");
          printedPDF=true;
          printPDF('pr-ready-to-print-event');
        }

        if (message.includes('User not authenticated')) {
          loggedIn=false;
          setTimeout(function(){ loginApp(); }, 120);
        }
      });

      // win.webContents.on('ipc-message', (event, channel, args) => {
      //   console.log("ipc-message: occurred from main.js event=" + JSON.stringify(event));
      //   console.log("ipc-message: occurred from main.js channel=" + channel);
      //   console.log("ipc-message: occurred from main.js args=" + args);
      //   process.send("ipc-message: event=" + event);
      // });

    }

    function loginApp() {
      // INFO: prToggleService: Cannot fetch toggles. User not authenticated
      loggedIn=true;
      if (loginRetry++ < 5) {
          //First jsInjection will get us logged into the app
          console.log("_config.locale =" + _config.locale );
          var jsInjection = "try { var injector = angular.element(document.body).injector();" +
          "injector.get('prAuthAuthService').createSession(" + JSON.stringify(_config.session) + ");" +
          "injector.get('prLanguageService').changeLocale('" + _config.locale + "')" +
          "} catch (ex) { var ipc = require('electron').ipcRenderer; ipc.send('error', ex.message); } ";

          win.webContents.executeJavaScript(jsInjection);
          process.send('WE ARE NOW LOGGED INTO THE APP'); 
      }
    }

    function printPDF(filenamePrePackcage) {
      win.webContents.printToPDF({}, (error, data) => {
        if (error) throw error
        fs.writeFile(filenamePrePackcage+'-'+d.toString()+'.pdf', data, (error) => {
          if (error) throw error
          console.log('Write PDF successfully.' + filenamePrePackcage);
          setTimeout(function(){ app.quit(); },99500);
        })
      });
    }

    process.send('LOGS: jsLogInjector = executeJavaScript' );
    process.send("LOGS: before injector code 1 logs render" );

    var jsLogInjector = "(function () {  console.log('injecting console log into render AFTER on did-finsih  renderer injected code: jsLogInjector'); " +
    // "  var ipc = require('electron').ipcRenderer; " +
    // "  ipc.send('logs', 'hey this is FROM TEST INJECTED javascript code sending log renderer'); " + 
    "})();";
    win.webContents.executeJavaScript(jsLogInjector);

};// of createMainWindow function!!

app.on('ready', async function () {
  filename = process.argv.pop();  //get the filename with UUID
  process.send('CONFIG');

  if (!createdWindow) {
    createdWindow=true;
    process.send('logs: createMainWindow(); is ready from app.on(ready, function() ');
    setTimeout(function(){ createMainWindow(); }, 90);
  }
  console.log("this is the createdWinow empty log")
  process.send("process.send createdWindow end:");
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

process.on('message', function(config) {
  _config = config;
  console.log("message, function(config) occurred");
  process.send("message:");
  if (!createdWindow) {
    createMainWindow();
  }
});


console.log = function (message) {
  process.send("LOGS: " + message);
}
console.error = function (message) {
  process.send("ERROR: " + message);
}