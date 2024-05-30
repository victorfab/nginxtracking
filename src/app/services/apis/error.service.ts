import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private router: Router) {}

  showError = false;

  /**
   *
   * @param error Observable definition error
   * @param errorId route param id (1: generic error, 2: card error)
   */
  errorShow(error: Observable<never>, errorId = '1') {
    this.showError = true;
    if (error && this.showError === true) {
      this.router.navigate(['error', errorId]);
      this.showError = false;
    }
  }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe( tap(() => { return },
        ( error ) => {
            if ([401, 403, 504].includes(error.status)) {

                return error.status;
            
            }

            return;
        }
    ));
}
}
