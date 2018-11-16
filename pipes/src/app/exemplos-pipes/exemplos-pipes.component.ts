import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  //PIPE PURO NÃO OLHA AS MODIFICAÇÕES QUE SÃO FEITAS NO OBJETO
  //POR ISSO QUE AO ADD NOVO LIVRO O FILTRO NÃO APLICA  
  //(QUANDO DEIXA JÁ UM FITLRO PREENCHIDO E ADD UM QUE CORRESPONDE 
  //AO FILTRO NÃO APARECE, SÓ SE FITLRAR DE NOV})

  //PIPE IMPURO OLHA AS MUDANÇAS

  livro: any = {
    titulo: "Código limpo",
    rating: 3.834,
    numeroPaginas: 440,
    preco: 86.17,
    dataLancamento: new Date(2009, 9, 1),
    url: "https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675?tag=goog0ef-20&smid=A1ZZFT5FULY4LN&ascsubtag=go_726685122_54292137521_242594579893_aud-594374058437:pla-398510646161_c_"
  }

  livros: string[] = ["Código Limpo", "DDD"];

  filtro: string;

  constructor() { }

  ngOnInit() {
  }

  addLivro(livro: string){
    this.livros.push(livro);
  }

  obterLivros(){
    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() == ''){
      return this.livros;
    }

    return this.livros.filter( (v) => { 
      if(v.toLocaleLowerCase().indexOf(this.filtro.toLocaleLowerCase()) != -1){
        return true;
      }
      return false;
    });
  }

}
