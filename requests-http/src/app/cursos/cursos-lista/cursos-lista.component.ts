import { Component, OnInit } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(private service: CursosService, private alertService: AlertModalService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return empty();
      })
    );

    // this.service.list()
    // .pipe(
    //   catchError(error => empty())
    // );

    // this.service.list().subscribe(
    //   dados => {
    //     console.log(dados);
    //   },
    //   error => console.error(error),
    //   () => console.log('Observable completo!')
    // );

  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente  mais tarde.');
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

}
