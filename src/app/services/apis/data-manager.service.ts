import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SECObjData } from 'src/app/shared/interfaces/response/opaqueToken.interface';

@Injectable({ providedIn: 'root' })
/**
 * Class CsrfService for get CSRF TOKEN
 */
export class DataManagerService {
  /**
   * variable para almacenar modelo modelCSRF
   */
  public data!: SECObjData[];
  /**
   * Variable for suscribe Subject
   */
  public $subject = new BehaviorSubject(this.data);
  /**
   * Variable observable status
   */
  public status = this.$subject.asObservable();
  /**
   * Method sendstatus observator
   * @param iStatus - word to find in table transfer
   */
  sendStatus(data: SECObjData[]): void {
    this.$subject.next(data);
  }
  /**
   * Method getstatus return observable
   */
  getStatus(): Observable<SECObjData[]> {
    return this.status;
  }
}
