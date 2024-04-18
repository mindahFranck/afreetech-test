/* /* eslint-disable no-console */
import { HttpResponse, HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class FormService {

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'rejectUnauthorized': 'false'
    })
  }
  getAll(api:string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/${api}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  search(api:string,value:any){
    return this.http.get<any>(`${environment.apiUrl}/${api}/${value.regionId}/${value.departementId}/${value.communeId}/${value.operateurs}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getFiliere(api:string,faculteId:number,diplomeId:number) {
    return this.http.get<any>(`${environment.apiUrl}/${api}/faculte?faculteId=${faculteId}&diplomeId=${diplomeId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getFiliereBy(api:string,faculteId:number,diplomeId:number) {
    return this.http.get<any>(`${environment.apiUrl}/${api}?faculteId=${faculteId}&diplomeId=${diplomeId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getDepartements(api:string,regionId:number) {
    return this.http.get<any>(`${environment.apiUrl}/${api}?regionId=${regionId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getArrondissement(api:string,departementId:number) {
    return this.http.get<any>(`${environment.apiUrl}/${api}?departId=${departementId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getData(api:string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/${api}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }



  create(api: string, form: any): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/${api}`, JSON.stringify(form), this.httpOptions)

      .pipe(

        catchError(this.handleError)
      )

  }




  update(api: string, form: any): Observable<any> {

    return this.http.put<any>(`${environment.apiUrl}/${api}`, JSON.stringify(form), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }


  updates(api: string, form: any): Observable<any> {

    return this.http.put<any>(`${environment.apiUrl}/${api}/${form.id}`, JSON.stringify(form), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )

  }


  delete(api: string) {
    return this.http.delete<any>(`${environment.apiUrl}/${api}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getByCode(api:string, code:string) {
    return this.http.get<any>(`${environment.apiUrl}/${api}/${code}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getById(api:string, id:number) {
    return this.http.get<any>(`${environment.apiUrl}/${api}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getState(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/`+"state", this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  getByEnrollement(api:string, type:string) {
    return this.http.get<any>(`${environment.apiUrl}/${api}/${type}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getDataReinscription(url:any, data:any){
    return this.http.get<any>(`${environment.apiUrl}/${url}?faculteId=${data.faculteId}&typeReinscription=${data.typeReinscription}&matricule=${data.matricule}&nom=${data.nom}&prenom=${data.prenom}&cni=${data.cni}&email=${data.email}&confirmationEmail=${data.confirmationEmail}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage;

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status == 201) {
        errorMessage = { "code": error.status, "message": "OK" };

      } else {
        errorMessage = { "code": error.status, "message": error.error.message };

      }
    }
    return throwError(errorMessage);
  }



}
