import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FlameTheme,
  FlameThemeService,
  FlameThemeModule
} from '@ngx-mxflame/atoms/theme';
import { FlameButtonModule } from '@ngx-mxflame/atoms/button';
import { FlameIconModule } from '@ngx-mxflame/atoms/icon';
import { AppRoutingModule } from './app-routing.module';
import { ViewsModule } from './views/views.module';
import { AppComponent } from './app.component';
import localeMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { ErrorService } from './services/apis/error.service';
registerLocaleData(localeMx, 'es-mx');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FlameThemeModule.forRoot({
      themes: [FlameTheme],
      default: FlameTheme
    }),
    GoogleTagManagerModule.forRoot({
      id: 'GTM-5J8273H4'
    }),
    FlameButtonModule,
    FlameIconModule,
    AppRoutingModule,
    ViewsModule
  ],
  providers: [
    FlameThemeService,
    {
      provide: LOCALE_ID,
      useValue: 'es-mx'
    },
    {

      provide: HTTP_INTERCEPTORS, useClass: ErrorService, multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
