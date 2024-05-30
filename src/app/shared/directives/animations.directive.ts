import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[lu-animation]'
})
export class AnimationsDirective {
  constructor(private element: ElementRef<HTMLElement>) {}

  /**
   * heigt element
   */
  height!: number;

  /**
   * Input set for animation
   */
  @Input() set animation(direction: string) {
    switch (direction) {
      case 'downUp':
        this.downUp();
        break;
      case 'zoomIn':
        this.zoomIn();
        break;

      default:
        break;
    }
  }

  /**
   * Animation downUp (error-dialog)
   */
  downUp() {
    this.element.nativeElement.classList.add('downUp');
    setTimeout(() => {
      this.element.nativeElement.style.bottom = '0';
    }, 300);
  }

  /**
   * Animation zoomIn (Modal)
   */
  zoomIn() {
    this.element.nativeElement.classList.add('zoomIn');
  }

  /**
   * Animation rotate (FAQs chevron)
   */
  @Input() set rotate(deg: number) {
    this.element.nativeElement.classList.add('rotate');
    this.element.nativeElement.style.transform = `rotate(${deg}deg)`;
  }

  /**
   * Animation dropDown
   */
  @Input() set dropDown(active: boolean) {
    if (!active) {
      this.height = this.element.nativeElement.clientHeight;
      this.element.nativeElement.classList.add('drop-down-hidden');
    } else {
      this.element.nativeElement.classList.remove('drop-down-hidden');
      this.element.nativeElement.style.height = `${this.height.toString()}px`;
    }
  }

  /**
   * Animation load progress
   */
  @Input() set loadProgress(load: { circunference: number; progress: number }) {
    this.element.nativeElement.style.strokeDashoffset = (
      (1 - load.progress) *
      load.circunference
    ).toString();
  }
}
