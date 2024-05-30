import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, throwError } from 'rxjs';
import { TokenSsoFacade } from '../services/facades/sso-facade.service';
import { TokenValidator } from '../shared/interfaces/response/opaqueToken.interface';
import { DataManagerService } from '../services/apis/data-manager.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit {
  constructor(
    private tokenFacade: TokenSsoFacade,
    private dataManager: DataManagerService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    if (!this.tokenFacade._token) {
      const responseToken = this.tokenFacade.validationToken();

      const validationToken = async () => {
        await firstValueFrom(responseToken)
          .then((resp: TokenValidator) => {
            this.dataManager.sendStatus(
              resp.SecObjRec.SecObjInfoBean.SecObjData
            );
            this.router.navigateByUrl('tracking');
          })
          .catch(err => {

            this.router.navigateByUrl('/error/'+`${err.status}`);
            return throwError(() => err);

          });
      };
      validationToken();
    }

  }

  
}
