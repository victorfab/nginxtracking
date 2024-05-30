import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { ErrorService } from '../apis/error.service';
import { TokenValidatorService } from '../apis/token-validator.service';

@Injectable({
  providedIn: 'root'
})
export class TokenSsoFacade {
  /**
   * Property to save query param token
   */
  public _token!: string;

  /**
   * Property to save challenges whit redirection
   */
  challengesRedirect: string[] = [];

  constructor(
    private tokenService: TokenValidatorService,
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  /**
   * function to validate token
   * @returns Observable TokenValidator
   */
  validationToken() {
    let tkn = '';
    let isBase64 = false;
    let error;

    let subscriptionRoute: Subscription =
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['token']) {
          tkn = this.transformBase64(params['token']);
          this._token = tkn;
          isBase64 = this.isBase64Token(tkn);
        } else {
          error = throwError(() => 'El token no existe');
        }
      });

    if (!isBase64) {
      error = throwError(() => 'El token no es base 64');
    }

    if (error) {
      this.errorService.errorShow(error);
      return error;
    }
    subscriptionRoute.unsubscribe();
    return this.tokenService.getValidateToken(tkn);
  }

  /**
   * function to validate if token is base64
   * @param tkn tkn
   * @returns boolean
   */
  isBase64Token(tkn: string) {
    let base64regex =
      /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;

    const validateBase64 = base64regex.test(tkn);

    if (!validateBase64) {
      return false;
    }
    return true;
  }

  /**
   * Function to transform tkn in base64
   * @param tkn
   * @returns string
   */
  transformBase64(tkn: string) {
    const token = tkn.split(' ');

    tkn = '';
    token.forEach((t, i) => {
      if (i < token.length - 1) {
        tkn += `${t}+`;
      } else {
        tkn += `${t}`;
      }
    });

    return tkn;
  }
}
