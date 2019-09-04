import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintReadyService {
  private readyToPrintEventName = 'pr-ready-to-print-event';
  private readyToPrintMessage = 'go-time-for-print';
  public _numberOfPrints=0;
  private has_ipc: boolean;
  public counterMax = 10000000;  // ten million 10,000,000
  private timers = [];
  private timersStart = [];
  public output = [];

  public getReadyToPrintMessage() {
    return this.readyToPrintMessage;
  }

  public setReadyToPrintMessage(newMessageValue) {
    this.readyToPrintMessage=newMessageValue;
  }

  public setTimerStart(timerStartPosition) {
    this.timersStart[timerStartPosition] = new Date();
  }


  public gettimer(timerStartPosition) {
    if (timerStartPosition == undefined) {
      timerStartPosition=0;
    }
    return ""+this.timers[timerStartPosition];
  }


  // public readyObservable(): any {
  //   const readyToPrintObservable = new Observable((observer) => {
  //     this._numberOfPrints++;
  
  //   // Get the next and error callbacks. These will be passed in when
  //   // the consumer subscribes.
  //   const {next, error} = observer;
  //   let watchId;
  
  //   });
  //   return readyToPrintObservable;
  // }

    producePage(timerStartPosition) {
      console.log('producePage()')
      this._numberOfPrints++;
      this.timersStart[timerStartPosition] = new Date();
      var w=0;
      var text="";
      for(w=0; w<this.counterMax; w++ ) {
        if ( w%357717 === 0) {
          text += " " + w;
        }
        if ( w%397919 === 0) {
          text += " ";
        }
      }
      this.timers[timerStartPosition] = (new Date().getMilliseconds()-this.timersStart[timerStartPosition].getMilliseconds());
      this.output[timerStartPosition] = '' + text;
      return this.output[timerStartPosition];
    }

    sendReadyToPrintIPC() {

    }

  /**
   * @ngdoc method
   * @name broadcastReadyToPrintEvent
   * @methodOf pr.reports.service:prReportsPhantomService
   * @description
   * ipcRenderer.send(this.readyToPrintMessage); 
   */
  broadcastReadyToPrintEvent() {
    this.sendReadyToPrintIPC();
  }

}
