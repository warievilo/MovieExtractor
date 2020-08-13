import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { environment } from 'src/environments/environment';

const endpoint = environment.omdbApiUrl;

@Injectable({
  providedIn: 'root'
})
export class FinderService {
  
  constructor(private http: HttpClient) { }
  
  getOne(id: string): Observable<any> {
    let searchUrl = endpoint;

    if (id)
      searchUrl+= `&i=${id}`;

    return this.http.get<any>(searchUrl).pipe(
      catchError(this.handleError)
    ); 
  }
  
  getMany(title: string, type: string, year: string, page: number): Observable<any> {    
    let searchUrl = endpoint;
    
    if (title)
      searchUrl+= `&s=${title}`;

    if (type)
      searchUrl+= `&type=${type}`;

    if (year)
      searchUrl+= `&y=${year}`;

    if (page)
      searchUrl+= `&page=${page}`;

    return this.http.get<any>(searchUrl).pipe(
      catchError(this.handleError)
    ); 
  }
  
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `omdb api returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }  
}
