import { Component, Input } from '@angular/core';
import { Stepper } from '../../interfaces/stepper.interface';

@Component({
  selector: 'app-vertical-stepper',
  templateUrl: './vertical-stepper.component.html',
  styleUrls: ['./vertical-stepper.component.scss']
})
export class VerticalStepperComponent {
  @Input('steps') steps: Stepper[] = [];
}
