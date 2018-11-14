import { Directive, HostListener, ElementRef, Renderer, HostBinding } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver (){
    // this._renderer.setElementStyle(this._elementRef.nativeElement,'background-color','yellow');
    this.backgroundColor = 'yellow';// modo mais elegante com HostBinding ao invés de renderer e elementRef 
  }

  @HostListener('mouseleave') onMouseLeave (){
    // this._renderer.setElementStyle(this._elementRef.nativeElement,'background-color','white');
    this.backgroundColor = 'white';// modo mais elegante com HostBinding ao invés de renderer e elementRef 
  }

  //Caso não precise de manipulação de dados
  @HostBinding('style.backgroundColor') backgroundColor: string;

  //Usa esta forma caso precise de manipulação dos dados
  // @HostBinding('style.backgroundColor') get setColor(){
  //   //manuipulação extra
  //     return this.backgroundColor;
  // }
  // private backgroundColor: string;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

}
