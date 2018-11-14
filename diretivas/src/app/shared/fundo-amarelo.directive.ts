import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  // selector: '[fundoAmarelo]'
  selector: 'p[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { 
    // console.log(this._elementRef);

    //MOdo abaixo náo recomendado, pois acessa diretamente
    // this._elementRef.nativeElement.style.backgroundColor = 'yellow';

    //Modo recomendado
    this._renderer.setElementStyle(
      this._elementRef.nativeElement,
      'background-color',
      'yellow'
    );
  }

}
