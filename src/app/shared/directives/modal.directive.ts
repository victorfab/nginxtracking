import {
  Directive,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[show]'
})
export class ModalDirective {
  /**
   * Reference to HTMLElement
   */
  htmlElement!: ElementRef<HTMLElement>;

  /**
   * Condition to show modal or element
   */
  @Input() set show(condicion: boolean) {
    condicion
      ? this.viewContainer.createEmbeddedView(this.templateRef)
      : this.viewContainer.clear();
  }

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainer: ViewContainerRef
  ) {
    this.htmlElement = this.templateRef.elementRef;
  }
}
