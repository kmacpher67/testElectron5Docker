'use strict';

var externalCallback;
var electron = require('electron');
var proc = require('child_process');
var filename = 'testpdfprint.pdf';
var child;
var sandbox='--no-sandbox'; //'--no-sandbox';

var exec = require('child_process').exec;

	//exec('ps -ef', function(err, stdout, stderr) {
	  // stdout is a string containing the output of the command.
	//  console.log("=====   BEFORE stdout="+stdout);
	//});

    //Start electron child process.  Pass in config as string and open IPC channel for sending messages
    child = proc.spawn(
        electron,
        [sandbox, 'main.js', filename],
            { stdio: [null, null, null, 'ipc']}
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
        console.log( message);
	});
	
	onEvent('logs', child);
    onEvent('errors', child);
    onEvent('close', child);
	onEvent('exit', child);
	
	function onEvent (event, child, fn) {
		child.on(event, data => console.log(`PID::${child.pid} EVENT::${event.toUpperCase()} DATA::${data}`));
		fn && fn();
	}