import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../shared/student';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  dataVal: any;

  // dataVal: any = {
  //   "counsellorId": 4001,
  //   "name": "Zeki",
  //   "requestList": [{
  //     "requestId": 2001,
  //     "requestText": "Software - AI guidance requied - 2to4me request from student",
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

  studentRequestViewData: any;
  studentCreatedData: any;
  // Define API
  apiURL = 'https://2d7mtg3uc5.execute-api.us-east-1.amazonaws.com/dev/student/';

  apiURLStudentView = 'https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/student/';

  apiURLStudentViewUrl = 'https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/student/create';

  // https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/student/STD2G001
  // https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/student/create
  // https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/student/update


  apiURLStudentRequestUrl = 'https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/request/create';

  apiRequestView = "https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/request/";

  // https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/request/REQRN000
  // https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/request/create
  // https://a96lt2f5fl.execute-api.us-east-1.amazonaws.com/dev/request/update

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



  // HttpClient API get() method => Fetch Students list
  getStudents(): Observable<Student> {
    return this.http.get<Student>(this.apiURLStudentView)
      .pipe(map((res: Response) => res),
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API get() method => Fetch Student
  getStudent(id): Observable<Student> {
     return this.http.get<Student>(this.apiURLStudentView + id)
      .pipe(map((res: Response) => res),
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API get() method => Fetch Student
  getRequest(id): Observable<Student> {
    return this.http.get<Student>(this.apiRequestView + id)
      .pipe(map((res: Response) => res),
        retry(1),
        catchError(this.handleError)
      )
  }
  // HttpClient API post() method => Create Request 
  createStudent(studentDetails): Observable<Student> {
    return this.http.post<Student>(this.apiURLStudentViewUrl, JSON.stringify(studentDetails), this.httpOptions)
      .pipe(
        map((res: Response) => res),
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Create Student
  createStudentRequest(studentRequestDetails): Observable<Student> {
    return this.http.post<Student>(this.apiURLStudentRequestUrl, JSON.stringify(studentRequestDetails), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // HttpClient API put() method => Update Student
  updateStudent(id, studentDetails): Observable<Student> {
    return this.http.put<Student>(this.apiURL + id, JSON.stringify(studentDetails), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API delete() method => Delete Student
  deleteStudent(id) {
    return this.http.delete<Student>(this.apiURL + id, this.httpOptions)
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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }









}
