import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { AlunosService } from '../alunos.service';
import { IFormCanDeactivate } from 'src/app/guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, IFormCanDeactivate {

  public aluno: any;
  public inscricacao: Subscription;
  private formMudou: boolean = false;

  constructor(private route: ActivatedRoute, private alunosService: AlunosService) { }
  
  ngOnInit() {
      this.inscricacao = this.route.params.subscribe((params: any) => {
          let id = params['id'];
          this.aluno = this.alunosService.getAluno(id);
          if(this.aluno === null){
              this.aluno = {};
          }
      });
  }

  ngOnDestroy(){
      this.inscricacao.unsubscribe();
  }

  onInput(){
    this.formMudou = true;
  }

  podeMudarRota(){
        if(this.formMudou){
            return confirm('Tem certeza que deseja sair dessa página?');
        }
        return true;
  }

  podeDesativar(){
      return this.podeMudarRota();
  }

}
