import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFilter]'
})
export class FilterDirective {

 constructor(private element: ElementRef, private renderer: Renderer2){}

 @HostListener('window:scroll') onscroll(){
  this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'white')
 }

}
