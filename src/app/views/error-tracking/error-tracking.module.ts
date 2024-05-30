import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorTrackingRoutingModule } from './error-tracking-routing.module';
import { ErrorTrackingComponent } from './error-tracking.component';
import { AtomsModule } from 'src/app/shared/atoms/atoms.module';

@NgModule({
  declarations: [ErrorTrackingComponent],
  imports: [CommonModule, ErrorTrackingRoutingModule, AtomsModule],
  exports: [ErrorTrackingComponent]
})
export class ErrorTrackingModule {}
