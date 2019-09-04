
// An empty module:
var app = angular.module('my-app', []);
const counterMax = 10000000;

// We could add a service:
// module.service('prReportsPhantomService', [prReportsPhantomService]);
app.service('prReportsPhantomService', function() {
  this.myFunc = function (timerStartPosition) {
    console.log('producePage');
    timersStart = new Date();
    // this.timersStart[timerStartPosition] = new Date();
    var w=0;
    var text="";
    //         100milion
    for(w=0; w<200000000; w++ ) {
      if ( w%757717 === 0) {
        text += " " + w;
      }
      if ( w%257717 === 0) {
        text += " ";
      }
    }
    // this.timers[timerStartPosition] = (new Date().getMilliseconds()-this.timersStart[timerStartPosition].getMilliseconds());
    // this.output[timerStartPosition] = '' + text;
    console.log("output ="+text);
    var timer = new Date().getMilliseconds() - timersStart.getMilliseconds()
    console.log("timer =  " + timer);
    return "" + text + " \n timer = " + timer;
  } 
});

app.controller("HelloWorldController", function($scope, prReportsPhantomService) {
  $scope.message = "Hello World!";

  $scope.hex = prReportsPhantomService.myFunc(1);
  $scope.$broadcast('pr-ready-to-print-event');
  console.log('pr-ready-to-print-event');
})