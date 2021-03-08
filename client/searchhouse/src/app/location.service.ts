import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {from, Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Locationh } from './location';
import { MessageService } from './message.service';




@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locateUrl = 'http://127.0.0.1:8000/locations'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getLocations(): Observable<Locationh[]>{
    return this.http.get<Locationh[]>(this.locateUrl).pipe(
      tap(_ => this.log('fetched suburbs')),
      catchError(this.handleError<Locationh[]>('getLocations', []))

    );
  }

  getLocationNo404<Data>(id: number): Observable<Locationh>{
    const url = `${this.locateUrl}/?id=${id}`;
    return this.http.get<Locationh[]>(url).pipe(
      map(locations => locations[0]), tap(h=>{
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Locationh>(`getLocation id=${id}`))
    );

  }

  getLocation(id: number): Observable<Locationh>{
    const url = `${this.locateUrl}/${id}`;

    return this.http.get<Locationh>(url).pipe(
      tap(_ =>this.log(`fetched suburb id=${id}`)),
      catchError(this.handleError<Locationh>(`getLocation id=${id}`))
    )
  }

  searchLocations(term: string): Observable<Locationh[]>{
    if (!term.trim()){
      return of([]);
    }
    return this.http.get<Locationh[]>(`${this.locateUrl}/?suburb=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found locations matching "${term}"`) :
        this.log(`no locations matching "${term}"`) ),
    catchError(this.handleError<Locationh[]>('searchLocations', []))
    );
  }

  addLocation(location: Locationh): Observable<Locationh>{
    return this.http.post<Locationh>(this.locateUrl, location, this.httpOptions).pipe(
      tap((newLocation: Locationh)=>this.log(`add location w/ id=${newLocation.id}`)),
      catchError(this.handleError<Locationh>('addLocation'))
    )
  }

  deleteLocation(location: Locationh | number): Observable<Locationh>{
    const id = typeof location === 'number' ? location: location.id;
    const url = `${this.locateUrl}/${id}`;

    return this.http.delete<Locationh>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted location id=${id}`)),
      catchError(this.handleError<Locationh>('deleteLocation'))
    )
  }

  updateLocation(location: Locationh): Observable<any>{
    return this.http.put(`${this.locateUrl}/${location.id}`, location, this.httpOptions).pipe(
      tap(_ => this.log(`updated Location id=${location.id}`)),
      catchError(this.handleError<any>('updateLocation'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);

    };
  }

  private log(message: string){
    this.messageService.add(`LocationService: ${message}`)
  }


}


