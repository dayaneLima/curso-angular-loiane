import { AlunosService } from './../alunos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy{

  aluno: Aluno;
  inscricacao: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private alunosService: AlunosService) { }

  ngOnInit() {
      // this.inscricacao = this.route.params.subscribe((params: any) => {
      //     let id = params['id'];
      //     this.aluno = this.alunosService.getAluno(id);
      // });
      console.log('ngOnInit: AlunoDetalheComponent');
      this.inscricacao = this.route.data.subscribe((info: { aluno: Aluno }) => {
          console.log('Recebendo o obj Aluno do resolver');
          this.aluno = info.aluno;
      });
  }

  ngOnDestroy(){
    this.inscricacao.unsubscribe();
  }

  editarAluno(){
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

}
