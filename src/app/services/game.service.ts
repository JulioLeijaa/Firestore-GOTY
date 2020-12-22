import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Game } from '../interfaces/interfaces';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private httpClient: HttpClient) { }

  getNominados(): any{
    return this.httpClient.get<Game[]>(`${environment.url}/api/goty`);
  }

  votarJuego( id: string): any{
    return this.httpClient.post(`${environment.url}/api/goty/${id}`, {})
                          .pipe(catchError( error => {
                            // console.log(error);
                            return of( error.error);
                          }));
  }
}
