import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosGuard } from './../guards/alunos.guard';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';

const alunosRoutes: Routes = [
    // { path: 'alunos', component: AlunosComponent, children: [
    { path: '', component: AlunosComponent, 
        canActivateChild: [AlunosGuard],
        children: [
        { path: 'novo', component: AlunoFormComponent },
        { path: ':id', component: AlunoDetalheComponent },
        { path: ':id/editar', component: AlunoFormComponent, 
            canDeactivate: [AlunosDeactivateGuard] }
    ] },
];

@NgModule({
  imports: [ RouterModule.forChild(alunosRoutes) ],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
