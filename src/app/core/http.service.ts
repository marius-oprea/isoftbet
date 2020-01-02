import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HttpService {
  constructor(private httpClient: HttpClient) {
  }

  get(url: string, queryParams?: any): Observable<any> {
    return this.httpClient.get(url, queryParams)
    .pipe(catchError(this.handleError<any>()));
  }

  post(url: string, body: any, options: any): Observable<any> {

    return this.httpClient.post(url, body, options)
    .pipe(catchError(this.handleError<any>()));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
