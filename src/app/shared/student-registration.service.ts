import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../shared/student';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StudentRegistrationService {

    constructor(private http: HttpClient) { }

    // URLS
    studentIdValidApiUrl = 'https://trznm8ccsi.execute-api.us-east-1.amazonaws.com/dev/student/authentication/';

    studentRegisterApiUrl = 'https://trznm8ccsi.execute-api.us-east-1.amazonaws.com/dev/student/registration';

    studentCreateRequestApiUrl = 'https://hmhhsmzid4.execute-api.us-east-1.amazonaws.com/dev/request/create';

    studentRequestsApiUrl = 'https://trznm8ccsi.execute-api.us-east-1.amazonaws.com/dev/student/getStudentRequests/';
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
    getStudentRequests(id): Observable<Student> {
        return this.http.get<Student>(this.studentRequestsApiUrl + id)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }


    // HttpClient API post() method => Create Student
    studentRegistration(studentRequestDetails): Observable<Student> {
        return this.http.post<Student>(this.studentRegisterApiUrl, JSON.stringify(studentRequestDetails), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    // HttpClient API post() method => Create Student Request
    studentCreateRequest(studentRequestDetails): Observable<Student> {
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
