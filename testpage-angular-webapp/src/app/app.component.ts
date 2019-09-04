import { Component , ChangeDetectorRef } from '@angular/core';
import { PrintReadyService } from './print-ready.service';

//const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PrintReadyService ]
})

export class AppComponent {

  constructor(
      public cdRef:ChangeDetectorRef,
      public print: PrintReadyService) { }

  title = 'testpage-project';
  counter = 0;
  public items  = [0,1,2,3,4]
  

  ngAfterViewInit() {
    console.log('ngAfterViewInit()');
    this.cdRef.detectChanges();
  }

  //ready = this.print.broadcastReadyToPrintEvent();

  timer(timerStartPosition) {
    console.log('timer function =' + timerStartPosition);
    return this.print.gettimer(timerStartPosition);
  }

  printComponentOutput(timerStartPosition) {

    console.log('printComponentOutput function =' + timerStartPosition +" counter=" + this.counter);
    if (this.counter++ > this.items.length || this.print.output[timerStartPosition] !== undefined) 
      {
        return this.print.output[timerStartPosition];
    }
    if (timerStartPosition === undefined) {
      timerStartPosition = 0;
    } 
    // if ( this.counter++ > 3) {
    //   this.print.broadcastReadyToPrintEvent();
    // }
    return this.print.producePage(timerStartPosition);
  }
}
