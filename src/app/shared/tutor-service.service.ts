import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tutor } from '../shared/tutor';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TutorServiceService {

 
  dataVal: any ;

  // dataVal: any = {
  //   "counsellorId": 4001,
  //   "name": "Zeki",
  //   "requestList": [{
  //     "requestId": 2001,
  //     "requestText": "Software - AI guidance requied - 2to4me request from tutor",
  //     "createdDate": "2019-05-25",
  //     "commentSet": [{
  //       "commentId": 5001,
  //       "commentText": "Accepted the request - 2001",
  //       "tutorId": 3001
  //     }]
  //   },
  //   {
  //     "requestId": 2002,
  //     "requestText": "Big Data Process - Seeking for help to resolve Data streeming process issues in my project",
  //     "createdDate": "2019-05-25",
  //     "commentSet": [{
  //       "commentId": 5002,
  //       "commentText": "Rejected the request - 2002 due to busy schedule",
  //       "tutorId": 3001
  //     }]
  //   },
  //   {
  //     "requestId": 2003,
  //     "requestText": "Need help on Datastructures",
  //     "createdDate": "2019-05-25",
  //     "commentSet": [{
  //       "commentId": 5003,
  //       "commentText": "Accepted by the Bhagavan",
  //       "tutorId": 3001
  //     }]
  //   }
  //   ]
  // };

  tutorRequestViewData: any;
  tutorCreatedData : any;
  // Define API
  apiURL = 'https://2d7mtg3uc5.execute-api.us-east-1.amazonaws.com/dev/tutor/STD2P000';
  apiURLTutorView = 'https://ql443vg4r0.execute-api.us-east-1.amazonaws.com/dev/tutor/';

  apiURLTutorViewUrl = 'https://ql443vg4r0.execute-api.us-east-1.amazonaws.com/dev/tutor/create';

  apiURLCommentRequestUrl = 'https://ql443vg4r0.execute-api.us-east-1.amazonaws.com/dev/comment/create';

  apiURLTutorRequestUrl = 'https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/request/create';

//   https://ql443vg4r0.execute-api.us-east-1.amazonaws.com/dev/comment/COMTA003
// https://ql443vg4r0.execute-api.us-east-1.amazonaws.com/dev/comment/create
// https://ql443vg4r0.execute-api.us-east-1.amazonaws.com/dev/comment/update

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



  // HttpClient API get() method => Fetch Tutors list
  getTutors(): Observable<Tutor> {
    return this.http.get<Tutor>(this.apiURLTutorView)
      .pipe(map((res: Response) => res ),
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API get() method => Fetch Tutor
  getTutor(id): Observable<Tutor> {
    // return this.http.get<Tutor>(this.apiURLTutorView + id)
    return this.http.get<Tutor>(this.apiURLTutorView + id)
      .pipe(map((res: Response) => res),
        retry(1),
        catchError(this.handleError)
      )
  }
  // HttpClient API post() method => Create Tutor
  createTutor(tutorDetails): Observable<Tutor> {
    return this.http.post<Tutor>(this.apiURLTutorViewUrl, JSON.stringify(tutorDetails), this.httpOptions)
      .pipe(
        map((res: Response) => res),
        catchError(this.handleError)
      )
  }

// HttpClient API post() method => Create Tutor
createTutorRequest(tutorRequestDetails): Observable<Tutor> {
  return this.http.post<Tutor>(this.apiURLTutorRequestUrl, JSON.stringify(tutorRequestDetails), this.httpOptions)
    .pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    )
}


// HttpClient API post() method => Create Tutor
createCommentRequest(commentRequestDetails): Observable<Tutor> {
  return this.http.post<Tutor>(this.apiURLCommentRequestUrl, JSON.stringify(commentRequestDetails), this.httpOptions)
    .pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    )
}


  // HttpClient API put() method => Update Tutor
  updateTutor(id, tutorDetails): Observable<Tutor> {
    return this.http.put<Tutor>(this.apiURL + id, JSON.stringify(tutorDetails), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API delete() method => Delete Tutor
  deleteTutor(id) {
    return this.http.delete<Tutor>(this.apiURL + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }



  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  //  window.alert(errorMessage);
    return throwError(errorMessage);
  }









}
