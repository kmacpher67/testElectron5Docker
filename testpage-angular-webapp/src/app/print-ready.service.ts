import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintReadyService {
  private readyToPrintEventName = 'pr-ready-to-print-event';
  private readyToPrintMessage = 'go-time-for-print';
  private _numberOfPrints=0;
  private has_ipc: boolean;

  
  public getReadyToPrintMessage() {
    return this.readyToPrintMessage;
  }

  public setReadyToPrintMessage(newMessageValue) {
    this.readyToPrintMessage=newMessageValue;
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

    producePage() {
      var w=0;
      var text="";
      for(w=0; w<10000000; w++ ) {
        if ( w%357717 === 0) {
          text += " " + w;
        }
        if ( w%397919 === 0) {
          text += " ";
        }
      }
      return text;
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
