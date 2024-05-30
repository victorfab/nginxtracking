import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TrackingCallbacksService } from 'src/app/services/tracking-callbacks.service';
import { ErrorData } from '../../interfaces/atoms/error';

@Component({
  selector: 'sn-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnDestroy {
  /**
   * error data to show
   */
  errorData: ErrorData = {
    title: 'Lo sentimos',
    message: `No podemos atender tu solicitud, por favor inténtalo más tarde.`,
    icon: 'EmptyState_012',
    button: false,
    redirect: '/'
  };

  /**
   * subscription activated route
   */
  subs$!: Subscription;

  constructor(
    private callback: TrackingCallbacksService,
    private activeRoute: ActivatedRoute
  ) {
    this.subs$ = this.activeRoute.params.subscribe(({ error }) => {
      if (error === '2') {
        this.errorData.title = 'Tu tarjeta está bloqueda';
      }
    });
  }

  /**
   * callback to close
   */
  close() {
    this.callback.gotoroot();
  }

  /**
   * Lifecycle
   */
  ngOnDestroy(): void {
    if (this.subs$) {
      this.subs$.unsubscribe();
    }
  }
}
