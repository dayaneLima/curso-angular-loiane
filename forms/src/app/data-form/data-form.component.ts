import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DropdownService } from './../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { FormValidations } from '../shared/form-validations';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  public formulario: FormGroup;
  public estados: Observable<EstadoBr[]>;
  public cargos: any[];
  public tecnologias: any[];
  public newsletterOp: any[];
  public frameworks = ['Angular', 'Vue', 'React', 'Sencha'];
  // public estados: EstadoBr[];

  constructor(private formBuilder: FormBuilder, private http: HttpClient,
    private dropdownService: DropdownService, private cepService: ConsultaCepService) { }

  ngOnInit() {
    //No item do html que usa o estados (o select estados) é colocado o pipe async,
    //que já faz o subscribe e espera obter o item pra fazer o foreach
    //e já faz o unsubscribe sozinho
    //Ex.: <option *ngFor="let estado of estados | async" [value]="estado.sigla" >{{estado.nome}}</option>
    this.estados =  this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();

    // this.dropdownService.getEstadosBr()
    //   .subscribe(dados => { this.estados = dados; });

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

  }

  onSubmit() {
    console.log(this.formulario);

    let valueSubmit = Object.assign({}, this.formulario.value);

    //pega os valores do array de checkbox - que é true para maracado e false para desmarcado, e monta um só com a descrição dos marcados
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null)
      .filter(v => v !== null)
    });

    console.log(valueSubmit);

    if (this.formulario.valid){
        this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
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

  verificaRequired(campo: string) {
    return this.formulario.get(campo).hasError('required') && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
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
    if (cep != null && cep !== "") {
      this.cepService.consultaCEP(cep).subscribe(dados => this.populaDadosForm(dados));
    }
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome == obj2.nome && obj1.nivel == obj2.nivel) : (obj1 === obj2);
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['dotnet', 'angular', 'php']);
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

}
