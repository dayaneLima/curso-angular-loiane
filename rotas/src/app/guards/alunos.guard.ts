import { CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AlunosGuard implements  CanActivateChild{

    canActivateChild(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | boolean {
            console.log('AlunosGuard: guarda de rota filha');
            if(state.url.includes('editar')){
                // alert('Usuário sem acesso');
                // return of(false);
                alert('Olá');
                return of(true);
            }

            return true;
      }
}