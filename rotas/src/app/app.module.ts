import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AppRoutingModule } from './app.routing.module';
import { CursosGuard } from './guards/cursos.guard';
import { AlunosGuard } from './guards/alunos.guard';
import { AuthGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

// import { CursosModule } from './cursos/cursos.module';
// import { AlunosModule } from './alunos/alunos.module';
// import { CursosComponent } from './cursos/cursos.component';
// import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
// import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
//import { routing } from './app.routing';
// import { CursosService } from './cursos/cursos.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    // CursosComponent,
    // CursoDetalheComponent,
    // CursoNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
    // CursosModule,
    // AlunosModule,
    //routing
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    CursosGuard, 
    AlunosGuard
  ],
  bootstrap: [AppComponent]
  //providers: [CursosService],
})
export class AppModule { }
