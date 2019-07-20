import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from './student';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TutorRegistrationService {

    constructor(private http: HttpClient) { }

    // URLS
    studentIdValidApiUrl = 'https://trznm8ccsi.execute-api.us-east-1.amazonaws.com/dev/student/authentication/';

    tutorRegisterApiUrl = 'https://trznm8ccsi.execute-api.us-east-1.amazonaws.com/dev/tutor/registration';

    studentCreateRequestApiUrl = 'https://hmhhsmzid4.execute-api.us-east-1.amazonaws.com/dev/request/create';

    tutorRequestsApiUrl = 'https://trznm8ccsi.execute-api.us-east-1.amazonaws.com/dev/tutor/getOpenAndTutorRequests/';


    tutorCommentRequestApiUrl = 'https://hmhhsmzid4.execute-api.us-east-1.amazonaws.com/dev/comment/create';
    /*========================================
      CRUD Methods for consuming RESTful API
    =========================================*/

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    // HttpClient API get() method => Fetch Student
    getStudent(id): Observable<Student> {
        return this.http.get<Student>(this.studentIdValidApiUrl + id)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    // HttpClient API get() method => Fetch Student
    getTutorRequests(id): Observable<Student> {
        return this.http.get<Student>(this.tutorRequestsApiUrl + id)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }


    // HttpClient API post() method => Create Student
    tutorRegistration(studentRequestDetails): Observable<Student> {
        return this.http.post<Student>(this.tutorRegisterApiUrl, JSON.stringify(studentRequestDetails), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }


    // HttpClient API post() method => Create Student
    tutorCommentRequests(studentRequestDetails): Observable<Student> {
        return this.http.post<Student>(this.tutorCommentRequestApiUrl, JSON.stringify(studentRequestDetails), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }


    // HttpClient API post() method => Create Student Request
    tutorCreateRequest(studentRequestDetails): Observable<Student> {
        return this.http.post<Student>(this.studentCreateRequestApiUrl, JSON.stringify(studentRequestDetails), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
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
