import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [CommonModule, DirectivesModule],
  exports: [ErrorDialogComponent]
})
export class ErrorDialogModule {}
