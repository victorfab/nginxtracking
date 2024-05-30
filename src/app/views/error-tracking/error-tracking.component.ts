import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-error-tracking',
  templateUrl: './error-tracking.component.html',
  styleUrls: ['./error-tracking.component.scss']
})
export class ErrorTrackingComponent implements OnInit {

  error_c: any;
  
  constructor(private _gtm: GoogleTagManagerService,
              private _router: ActivatedRoute) {
              }

  ngOnInit(): void {

    this.error_c = document.location.href;
    
    this._gtm.pushTag({
      event: 'interaccion',
      categoria: 'error',
      accion: 'error/'+`${this.error_c}`,
      etiqueta: 'Error de conexion'
    });
  }
}
