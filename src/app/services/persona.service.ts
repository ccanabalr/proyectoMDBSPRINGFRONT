import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Persona } from '../models/persona';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint:string = 'http://localhost:8080/api/personas';

  constructor(private http: HttpClient, private router:Router) { }

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlEndPoint);
  }

  create(persona: Persona): Observable<Persona>{
    return this.http.post(this.urlEndPoint, persona).pipe(
      map((response: any) => response.persona as Persona),
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getPersona(idPersona): Observable<Persona>{
    return this.http.get<Persona>(`${this.urlEndPoint}/${idPersona}`).pipe(
      catchError(e=>{
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/personas']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(persona: Persona): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${persona.id}`, persona ).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }

        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  delete(idPerson: string): Observable<Persona>{
    return this.http.delete<Persona>(`${this.urlEndPoint}/${idPerson}`).pipe(
      catchError(e =>{
        if(e.error.mensaje){
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
