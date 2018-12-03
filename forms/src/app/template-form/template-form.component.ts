import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  //usado apenas para iniciar o valor na tela - se alterar na tela náo altera aqui pois lá está usando [ngModel] ao invés de [(ngModel)]
  usuario: any = {
    nome: '',
    email: '' 
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form){
      console.log(form.value);
      console.log(this.usuario);
  }

}
