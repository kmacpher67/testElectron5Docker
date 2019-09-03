import { Component } from '@angular/core';
import { PrintReadyService } from './print-ready.service';

//const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PrintReadyService ]
})

export class AppComponent {

  constructor(private print: PrintReadyService) { }

  title = 'testpage-project';
  counter = 0;
  timers = [new Date(), new Date(), new Date(), new Date()];

  //ready = this.print.broadcastReadyToPrintEvent();

  timer(timerStartPosition) {
    console.log(timerStartPosition);
    if (timerStartPosition === undefined) {
      timerStartPosition = 0;
    } 
    console.log(this.timers);
    console.log(timerStartPosition);
    console.log(this.timers[timerStartPosition]);
    console.log(this.timers[timerStartPosition].getMilliseconds());
    return ( new Date().getMilliseconds()-this.timers[timerStartPosition].getMilliseconds());
  }

  printComponentOutput(timerStartPosition) {
    if (timerStartPosition === undefined) {
      timerStartPosition = 0;
    } 
    this.timers[timerStartPosition] = new Date();
    if ( this.counter++ > 3) {
      this.print.broadcastReadyToPrintEvent();
    }
    return this.print.producePage();
  }
}
