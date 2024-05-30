import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenValidator } from 'src/app/shared/interfaces/response/opaqueToken.interface';

@Injectable({
  providedIn: 'root'
})
export class TokenValidatorService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Function request /session
   * @param tkn opaque token
   * @returns response session
   */
  getValidateToken(tkn: string): Observable<TokenValidator> {
    const headers = new HttpHeaders({
      Authorization: tkn
    });

    const url = environment.session;
    return this.httpClient.post<TokenValidator>(url, null, { headers }).pipe(retry(3))
  }
}
