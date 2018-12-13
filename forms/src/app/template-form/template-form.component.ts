import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

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

  constructor(private http: Http) { }

  ngOnInit() {
  }

  onSubmit(form){
      console.log(form.value);
      console.log(this.usuario);
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }
  
  consultaCEP(cep){
      cep = cep.replace(/\D/g, '');//somente dígitos
      if(cep != ""){
          var validacep = /^[0-9]{8}$/;//cep com 8 digitos numéricos
          if(validacep.test(cep)){
              this.http.get(`//viacep.com.br/ws/${cep}/json`)
                .pipe(map(dados => dados.json()))
                .subscribe(dados => console.log(dados));
          }
      }
  }

}
