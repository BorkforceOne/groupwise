import {Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutoFocusDirective {

  constructor(public renderer: Renderer, public elementRef: ElementRef) {}

  ngOnInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []);
  }

}
