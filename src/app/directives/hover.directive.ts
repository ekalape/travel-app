import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true,
})
export class HoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.5s ease-in-out');

  }

  @HostListener('mouseenter') onHover() {
    this.renderer.setStyle(this.el.nativeElement, '-webkit-text-stroke', '1px white');
  }
  @HostListener('mouseleave') onHoverOut() {
    this.renderer.removeStyle(this.el.nativeElement, '-webkit-text-stroke');
  }

}
