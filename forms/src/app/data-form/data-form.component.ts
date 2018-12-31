import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  public formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: Http) { }

  ngOnInit() {

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

  onSubmit(){
    console.log(this.formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .pipe(map(res => res))
    .subscribe(dados => {
      console.log(dados);
      //reseta o form
      this.resetar();
    },
    (error: any) => alert("Erro"));
  }

  resetar(){
    this.formulario.reset();
  }
  
  verificaValidTouched(campo: string){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  
  verificaEmailInvalido(){
    let campoEmail = this.formulario.get('email');
    if(campoEmail.errors){
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: string){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }

}
