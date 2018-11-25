import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy {

  aluno: any;
  inscricacao: Subscription;

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

}
