import { Component } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nginx-tracking';

  constructor(private _gtmService: GoogleTagManagerService) {
    this.deleteAllCookies();
    this._gtmService.addGtmToDom();
  }

  deleteAllCookies() {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  }
}
