import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDirective } from './modal.directive';
import { AnimationsDirective } from './animations.directive';

@NgModule({
  declarations: [ModalDirective, AnimationsDirective],
  imports: [CommonModule],
  exports: [ModalDirective, AnimationsDirective]
})
export class DirectivesModule {}
