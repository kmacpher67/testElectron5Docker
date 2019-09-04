'use strict';

var electron = require('electron');
var proc = require('child_process');
var filename = 'testpdfprint.pdf';
var child;
var sandbox='--no-sandbox'; //'--no-sandbox';
var logNet='--log-net-log=/home/kenmac/dev-ui/testElectron5/net-log'+new Date().getMilliseconds();
var logLevel='--v=1';

var exec = require('child_process').exec;

	//exec('ps -ef', function(err, stdout, stderr) {
	  // stdout is a string containing the output of the command.
	//  console.log("=====   BEFORE stdout="+stdout);
	//});

	console.log("=====   before child = proc.spawn(");
    //Start electron child process.  Pass in config as string and open IPC channel for sending messages
    child = proc.spawn(
        electron,
        [sandbox, logNet, 'main.js', filename],
            {
				ELECTRON_ENABLE_LOGGING:1,   
				stdio: [null, null, null, 'ipc']}
     );

    console.log("=====   main.js stdout after before ps 2 function =============== \n");


	// exec('ps -ef', function(err, stdout, stderr) {
	//   // stdout is a string containing the output of the command.
	//   console.log("AFTER stdout="+stdout);
	// });

	child.on('logs', function(logs) {
        console.log('child process logs' +  logs);
	});
	
	child.on('error', function(error) {
        console.log('child process error' +  error);
	});


	child.on('message', function(message) {
		console.log("node test child.on( message received from main.js process...");

        if(message === 'DONE') {
			console.log("test.js message is equal to DONE!!!!!")
        }
        else if(message === 'CONFIG') {
			console.log("test.js message is equal to DONE!!!!!")
            child.send(config);
		}
		else if(!message.includes("LOGS")) {
			console.log("simple message is: = " + message);
		}
    });

	//console.log("== test.jsCallsToMain.js: after error  function 2");

	child.on('message', function(message) {
        console.log( message);
	});

	console.log("== testCallToMain: after message  function 3");
	onEvent('logs', child);
    onEvent('errors', child);
    onEvent('close', child);
	onEvent('exit', child);

	console.log("== testCallToMain: after onEvents  function 4");

	function onEvent (event, child, fn) {
		child.on(event, data => console.log(`PID::${child.pid} EVENT::${event.toUpperCase()} DATA::${data}`));
		fn && fn();
	}

	console.log("== test.jsCallToMain: bottom of page");