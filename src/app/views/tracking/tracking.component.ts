import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackingFacadeService } from 'src/app/services/facades/tracking-facade.service';
import { Stepper } from 'src/app/shared/interfaces/stepper.interface';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TrackingService } from '../../services/apis/tracking.service';
import { TrackingCallbacksService } from 'src/app/services/tracking-callbacks.service';

import {
  STATUS_CATALOG
} from 'src/app/shared/constants/status-catalog.contants';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  loaderResponse: boolean = true;

  steps: Stepper[] = [];
  status: any = 'preparando-tu-tarjeta';
  envval: any;
  banca: any = '';

  constructor(
    private trackingFacadeService: TrackingFacadeService,
    private router: Router,
    private _gtmService: GoogleTagManagerService,
    private _device: DeviceDetectorService,
    private _trackingService: TrackingService,
    private _TrackingCallbacksService: TrackingCallbacksService
  ) {}

  ngOnInit(): void {
    this.loaderResponse = true;
    this._trackingService.getTrackingInfo()
    .subscribe( (resp) => {
      let env = resp.env;
      if(env === false) {
        this.envval = 'DEV';
      } else {
        this.envval = 'PROD';
      }
      
    });
    this.trackingFacadeService.getTrackingResponse().subscribe({
      next: data => {
        data.forEach((dt => { 

          if(dt.status === 'SUCCESS' || dt.status === 'CANCEL') {
            const trakingObj = STATUS_CATALOG.find((x) => {
               return Number(dt.idTrakingStatusCode) === Number(x?.idTrakingStatusCode)
              });

              this.status = trakingObj!.title;
              this.banca = trakingObj!.branchName;

              if( this.status === 'No fué posible entregar tu tarjeta' ) {
                this.status = 'ultimo_intento_sin_exito';
              }
              
              if( this.status ===  'Estamos preparando tu tarjeta' ) {
                this.status = 'tarjeta-preparada';
              }

          }
        }));
        this.steps = data;
        this.tagStatus(this.steps.at(0)!);
        this.loaderResponse = false;
      },
      error: () => {
        this.router.navigateByUrl('/error/404');
      }
    });
  }

  tagStatus(step: Stepper) {

    this._gtmService.pushTag({
      url: `card_tracking/${
        step.deliveryType === "BRANCH_DELIVERY" ? 'sucursal' : 'domilicio'
      }/${this.status.toLowerCase().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`,
      titulo: `|Tracking|${step.deliveryType === "BRANCH_DELIVERY" ? 'sucursal' : 'domilicio'}|${this.status.toLowerCase().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`,
      tipoSitio: `Privado`,
      canalBanco: `Supermovil`,
      versionApp: `1.0.0`,
      marcadispositivo: `${this._device.getDeviceInfo().device.replace(/\s/g, "_")}`,
      sistema_operativo: `${this._device.getDeviceInfo().os}`,
      tipodispositivo: `${this._device.getDeviceInfo().deviceType}`,
      userID: `${this._trackingService.getPartyID()}`,
      proceso: `tracking-${
        step.deliveryType === "BRANCH_DELIVERY" ? 'sucursal' : 'domilicio'
      }`,
      status: `${this.status}` === 'undefined' ? '' : `${this.status.toLowerCase().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`,
      subsection1: `${
        step.deliveryType === "BRANCH_DELIVERY" ? 'sucursal' : 'domilicio'
      }`,
      inmueble: `${this.banca}` === 'undefined' ? '' : `${this.banca.toLowerCase().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`,
      subsection2: "",
      tipo_tarjeta: ``,
      tag_descripcion_tarjeta: ``,
      producto: ``,
      entorno: `${this.envval}`,
      event: `PageView`
    });
  }

  gotoRoot() {
    this._TrackingCallbacksService.gotoroot();
  }
}
