import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: string[] = [];
  // cursosService: CursosService;

  constructor(private cursosService: CursosService) {
    // this.cursosService = cursosService;
    // this.cursosService = new CursosService();
  }

  ngOnInit() {
    this.cursos = this.cursosService.getCursos();

    this.cursosService.emitirCursoCriado.subscribe(
      curso => console.log(curso, "esse nao funciona pq o criar curso e o receber-curso compartilham do mesmo service e esse não")
    );

    CursosService.criouNovoCurso.subscribe(
      curso => { this.cursos.push(curso); console.log("funfa com static",curso); }
    );

  }

}
