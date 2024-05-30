import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { TrackingDeliveryResponse } from '../../shared/interfaces/tracking-delivery-response.interface';
import { DataManagerService } from './data-manager.service';
import { SECObjData } from 'src/app/shared/interfaces/response/opaqueToken.interface';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  constructor(
    private http: HttpClient,
    private dataManager: DataManagerService,
    private errorService: ErrorService
  ) {}

  public getTrackingInfo(): Observable<TrackingDeliveryResponse> {
    let url = environment.URLTRACKINGSERVICE;
    const body = {
      cardNumLastDig: this.getCardNumLastDig()
    };
    if (url && url !== '') {
      return this.http.post<TrackingDeliveryResponse>(url, body);
    } else {
      this.errorService.errorShow(new Observable<never>());
      return new Observable<TrackingDeliveryResponse>();
    }
  }

  getDataValue(data: Observable<SECObjData[]>, key: string): string {
    let value = '';
    data.subscribe((data: SECObjData[]) => {
      let field = data
        ? data.find(
            s =>
              s.SecObjDataKey === key &&
              s.SecObjDataValue &&
              s.SecObjDataValue !== ''
          )
        : undefined;
      if (field) {
        value = field.SecObjDataValue;
      }
    });
    return value;
  }

  getCardNumLastDig(): string {
    if (
      this.getDataValue(this.dataManager.getStatus(), 'PartyId') !== '' &&
      this.getDataValue(this.dataManager.getStatus(), 'CardNumLastDig') !== ''
    ) {
      return this.getDataValue(this.dataManager.getStatus(), 'CardNumLastDig');
    } else {
      return '';
    }
  }

  getPartyID(): string {
    if (this.getDataValue(this.dataManager.getStatus(), 'PartyId') !== '') {
      return this.getDataValue(this.dataManager.getStatus(), 'PartyId');
    } else {
      return '';
    }
  }
}
