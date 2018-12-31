import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { DropdownService } from './../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  public formulario: FormGroup;
  public estados: EstadoBr[];

  constructor(private formBuilder: FormBuilder, private http: Http, private dropdownService: DropdownService) { }

  ngOnInit() {
    this.dropdownService.getEstadosBr()
      .subscribe(dados => { this.estados = dados; console.log(this.estados); });

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });

  }

  onSubmit() {
    console.log(this.formulario);

    if (this.formulario.valid){
        this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .pipe(map(res => res))
        .subscribe(dados => {
          console.log(dados);
          // reseta o form
          this.resetar();
        },
        (error: any) => alert('Erro'));
    } else {
      console.log('formulário inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if(controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaEmailInvalido() {
    const campoEmail = this.formulario.get('email');
    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  populaDadosForm(dados) {
    this.formulario.patchValue({
        endereco: {
            rua: dados.logradouro,
            complemento: dados.complemento,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
        }
    });
}

resetaDadosForm() {
  this.formulario.patchValue({
    endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
    }
  });

  this.formulario.get('nome').setValue('exemplo de setar valor em um único campo');

}

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;

    cep = cep.replace(/\D/g, ''); // somente dígitos
    if (cep != '') {
        let validacep = /^[0-9]{8}$/; // cep com 8 digitos numéricos
        if(validacep.test(cep)){

            this.resetaDadosForm();

            this.http.get(`//viacep.com.br/ws/${cep}/json`)
              .pipe(map(dados => dados.json()))
              .subscribe(dados => this.populaDadosForm(dados));
        }
    }
  }

}
