import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";



const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };
  @Injectable({
    providedIn: 'root'
  })
  export class AccountService {
  
    constructor(private httpCient: HttpClient) { }

    


    

    login(login: any): Observable<any> {
      const url = `${environment.apiUrl}/login/users`;
      return this.httpCient.post<any>(url, login)
        .pipe(
          retry(2),
          catchError(this.handleErrors)
        )
    }
  





    private handleErrors(error: HttpErrorResponse) {
      let errorMessage;
    
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        if (error.status == 200) {
          errorMessage = { "Code d'erreur": error.status, "message": "OK" };
  
        } else {
          errorMessage = { "Code d'erreur": error.status, "message": error.error.message };
  
        }
      }
      return throwError(errorMessage);
    }
  }