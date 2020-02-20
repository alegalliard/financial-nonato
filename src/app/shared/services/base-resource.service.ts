import { BaseResourceModel } from '../models/base-resource.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel> {
    protected http: HttpClient;
    private httpOptions = {
        headers : new HttpHeaders({'x-parse-application-id' : 'br.com.metasix.semneura'})
      }

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath, this.httpOptions).pipe(
          catchError(this.handleError),
          map(this.jsonDataToResources.bind(this))
        );
      }
    
      getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
          catchError(this.handleError),
          map(this.jsonDataToResource.bind(this))
        );
      }
    
      create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
          catchError(this.handleError),
          map(this.jsonDataToResource)
        );
      }
    
      update(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;
    
        return this.http.put(url, resource).pipe(
          catchError(this.handleError),
          map((resource) => resource)
        );
      }
    
      delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
    
        return this.http.delete(url).pipe(
          catchError(this.handleError),
          map(() => null)
        );
      }
    
      //protected methods
    
      protected jsonDataToResources(jsonData: any[]): T[] {
        const resources: T[] = [];
        jsonData.forEach(
          element => resources.push(this.jsonDataToResourceFn( element) )
        );
        return resources;
      }
    
      protected handleError(error: any): Observable<any> {
        console.log(`Erro na requisição => ${error}`);
        return throwError(error);
      }
    
      protected jsonDataToResource(jsonData: any): T {
        return jsonData as T;
      }
}