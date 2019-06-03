import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Counsellor } from '../shared/counsellor';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CounsellorServiceService {

dataVal : any ;

  // Define API
  apiURL = 'https://ygv9krjk6f.execute-api.us-east-1.amazonaws.com/dev/counsellor/';
  apiURLCreateCounsellor = "https://ygv9krjk6f.execute-api.us-east-1.amazonaws.com/dev/counsellor/create"

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  



  // HttpClient API get() method => Fetch Counsellors list
  getCounsellors(): Observable<Counsellor> {
    return this.http.get<Counsellor>(this.apiURL)
    .pipe( map((res: Response) => res), 
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch Counsellor
  getCounsellor(id): Observable<Counsellor> {
    return this.http.get<Counsellor>(this.apiURL + id)
    .pipe( map((res: Response) => res), 
      retry(1),
      catchError(this.handleError)
    )
  }  

 // HttpClient API post() method => Create Counsellor
 createCounsellor(counsellorDetails): Observable<Counsellor> {
  return this.http.post<Counsellor>(this.apiURLCreateCounsellor, JSON.stringify(counsellorDetails), this.httpOptions)
  .pipe(map((res: Response) => res), 
    retry(1),
    catchError(this.handleError)
  )
}  



  // HttpClient API put() method => Update Counsellor
  updateCounsellor(id, counsellorDetails): Observable<Counsellor> {
    return this.http.put<Counsellor>(this.apiURL + id, JSON.stringify(counsellorDetails), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete Counsellor
  deleteCounsellor(id){
    return this.http.delete<Counsellor>(this.apiURL + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }




















}
