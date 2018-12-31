import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class DropdownService {

  constructor(private http: Http) { }

  getEstadosBr() {
    return this.http.get('assets/dados/estadosbr.json')
    .pipe(map((res: Response) => res.json()));
  }
}
