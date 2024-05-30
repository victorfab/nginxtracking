import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalStepperComponent } from './vertical-stepper/vertical-stepper.component';
import { FlameIconModule } from '@ngx-mxflame/atoms/icon';
import { SpinnerModule } from './spinner/spinner.module';
import { ErrorDialogModule } from './error-dialog/error-dialog.module';

@NgModule({
  declarations: [VerticalStepperComponent],
  imports: [CommonModule, FlameIconModule, SpinnerModule, ErrorDialogModule],
  exports: [
    FlameIconModule,
    VerticalStepperComponent,
    SpinnerModule,
    ErrorDialogModule
  ]
})
export class AtomsModule {}
