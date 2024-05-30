import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { AtomsModule } from '../../shared/atoms/atoms.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TrackingComponent],
  imports: [CommonModule, TrackingRoutingModule, AtomsModule, HttpClientModule],
  exports: [TrackingComponent]
})
export class TrackingModule {}
