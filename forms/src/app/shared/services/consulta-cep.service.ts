import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {
    cep = cep.replace(/\D/g, ''); // somente dígitos
    if (cep != '') {
        const validacep = /^[0-9]{8}$/; // cep com 8 digitos numéricos
        if(validacep.test(cep)){
            return this.http.get(`//viacep.com.br/ws/${cep}/json`);
        }
    }

    return of({});
  }
}
