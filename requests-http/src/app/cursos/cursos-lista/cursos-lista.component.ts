import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal') deleteModal;

  // cursos: Curso[];
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  cursoSelecionado: Curso;

  constructor(private service: CursosService, private alertService: AlertModalService,
    private router: Router, private route: ActivatedRoute, private modalService: BsModalService) { }

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

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    this.deleteModalRef = this.modalService.show(this.deleteModal,  {class: 'modal-sm'});
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.deleteModalRef.hide();
        this.onRefresh();
      },
      error => {
        this.deleteModalRef.hide();
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  }

}
