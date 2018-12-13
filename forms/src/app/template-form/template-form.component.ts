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
  
  consultaCEP(cep, formulario){
      cep = cep.replace(/\D/g, '');//somente dígitos
      if(cep != ""){
          var validacep = /^[0-9]{8}$/;//cep com 8 digitos numéricos
          if(validacep.test(cep)){
            
              this.resetaDadosForm(formulario);

              this.http.get(`//viacep.com.br/ws/${cep}/json`)
                .pipe(map(dados => dados.json()))
                .subscribe(dados => this.populaDadosForm(dados, formulario));
          }
      }
  }

  populaDadosForm(dados, formulario){
      //o nome e e-mail deve pegar do próprio formulario para não apagar
      //tem que passar todas as propriedades do formulário
      // formulario.setValue({
      //     nome: formulario.value.nome,
      //     email: formulario.value.email,
      //     endereco: {
      //         rua: dados.logradouro,
      //         cep: dados.cep,
      //         numero: "",
      //         complemento: dados.complemento,
      //         bairro: dados.bairro,
      //         cidade: dados.localidade,
      //         estado: dados.uf
      //     }
      // });
    
      //Passa somente os atributos que deseja alterar
      formulario.form.patchValue({
          endereco: {
              rua: dados.logradouro,
              complemento: dados.complemento,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf
          }
      });      
  }  

  resetaDadosForm(formulario){
      formulario.form.patchValue({
          endereco: {
              rua: null,
              complemento: null,
              bairro: null,
              cidade: null,
              estado: null
          }
      });
  }

}
