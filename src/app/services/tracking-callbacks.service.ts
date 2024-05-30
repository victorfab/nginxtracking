import { Injectable } from '@angular/core';

declare let Connect: any;
declare let Tracking: any;

@Injectable({
  providedIn: 'root'
})
export class TrackingCallbacksService {

  close() {
    if (typeof Tracking !== 'undefined') {
      Tracking.close();
    } else if (
      (window as any).webkit !== undefined &&
      (window as any).webkit.messageHandlers.Tracking !== undefined
    ) {
      (window as any).webkit.messageHandlers.Tracking.close();
    }
  }

  gotoroot() {
      (window as any).webkit.messageHandlers.Connect.postMessage('{ "name": "goToRoot", "parameters": null, "callbackName": ""}');
      (window as any).webkit.Connect.goToRoot();
  }

}
