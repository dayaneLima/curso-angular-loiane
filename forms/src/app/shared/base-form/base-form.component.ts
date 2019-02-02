import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;
  private formSubmitAttempt: boolean;

  constructor() { }

  ngOnInit() {
  }

  abstract submit();

  onSubmit() {
    this.formSubmitAttempt = true;

    if (this.formulario.valid){
      this.submit();
    }
    else {
      console.log('formulário inválido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      controle.markAsTouched();
      if(controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  isFieldValid(field: string) {
    return (!this.formulario.get(field).valid && this.formulario.get(field).touched) ||
      (this.formulario.get(field).untouched && this.formSubmitAttempt);
  }

  resetar(){
    this.formulario.reset();
    this.formSubmitAttempt = false;
  }

  verificaRequired(campo: string) {
    return this.formulario.get(campo).hasError('required') && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  verificaValidTouched(campo: string) {
    // return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
    return this.isFieldValid(campo);
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

  getCampo(campo: string) {
    return this.formulario.get(campo);
  }

}
