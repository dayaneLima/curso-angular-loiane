import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';

import { AlertModalService } from './../../shared/alert-modal.service';
import { CursosService } from './../cursos.service';
import { Curso } from '../curso';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CursosService,
    private modal: AlertModalService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {

    // ** Forma mais verbosa **
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     const curso$ = this.service.loadById(id);
    //     curso$.subscribe( (curso: Curso) => {
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    // ** Forma mais enxuta e elegante **
    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap( id => this.service.loadById(id))
    //   // switchMap(cursos => obterAulas)
    // )
    // .subscribe((curso: Curso) => this.updateForm(curso));

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem nao importa
    // exhaustMap -> casos de login

    // ** Forma com resolver de rota (guards): requests-http\src\app\cursos\guards\curso-resolver.guard.ts **
    const curso = this.route.snapshot.data['curso'];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  // updateForm(curso: Curso) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('curso criado com sucesso!');
          this.location.back();
        },
        error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
        () => console.log('request completo')
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

}
