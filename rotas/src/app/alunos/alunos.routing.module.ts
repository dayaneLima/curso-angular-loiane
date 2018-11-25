import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';

const alunosRoutes: Routes = [
    { path: 'alunos', component: AlunosComponent, children: [
        { path: 'novo', component: AlunoFormComponent },
        { path: ':id', component: AlunoDetalheComponent },
        { path: ':id/editar', component: AlunoFormComponent }
    ] },
];

@NgModule({
  imports: [ RouterModule.forChild(alunosRoutes) ],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
