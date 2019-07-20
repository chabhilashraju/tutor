import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Student } from '../../shared/student';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TutorRegistrationService } from '../../shared/tutor-registration.service';

export interface User {
  id: number;
  name: string;
  requestSet: any;
  gradeMaster: any;
  studentId: any;
  tutorId: any;
  openRequestSet: any;
  tutorRequestSet: any;
}

@Component({
  templateUrl: 'tutor.component.html'
})

export class TutorComponent implements OnDestroy, OnInit {

  currentUser: User;

  requestIdVal: any;
  requestBodyVal: any;
  requestTypeVal: any;
  priorityVal: any;
  statusVal: any;
  availableDateVal: any;
  startTimeVal: any;
  endTimeVal: any;
  subjectNameVal: any;
  commentTextVal: any;


  totalRequestCount: any;
  scheduleRequestCount: any;
  inProgressRequestCount: any;
  openRequestCount: any;


  requestIdVal1: any;
  requestBodyVal1: any;
  requestTypeVal1: any;
  priorityVal1: any;
  statusVal1: any;
  availableDateVal1: any;
  startTimeVal1: any;
  endTimeVal1: any;
  subjectNameVal1: any;
  commentTextVal1: any;
  helpAera1: any;
  createdDate1: any;

  createdDate: any;
  helpAera: any;
  requestJson: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Student> = new Subject();

  // dtOptions1: DataTables.Settings = {};
  // dtTrigger1: Subject<Student> = new Subject();

  persons: any = [];
  tutorData: any = [];
  // tslint:disable-next-line: no-inferrable-types
  showCreateStudentRequest: boolean = false;
  myDateValue: Date;

  constructor(
    private http: HttpClient, private tutorServiceApi: TutorRegistrationService
    //  private studentInfo: StudentInfoService, private http: HttpClient, private tutorInfo: TutorServiceService
  ) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log( "currentUser" + this.currentUser);
  }

  someClickHandler(info: any): void {
    this.requestIdVal = info.requestId;
    this.helpAera = info.subjectMaster.subjectName;
    this.requestBodyVal = info.requestBody;
    this.requestTypeVal = info.requestType;
    this.priorityVal = info.priority;
    this.statusVal = info.status;
    this.availableDateVal = info.availableDate;
    this.startTimeVal = info.startTime;
    this.endTimeVal = info.endTime;
    this.subjectNameVal = info.subjectName;
    this.commentTextVal = info.commentText;
    this.createdDate = info.createdDate;
  }


  // someClickHandler1(info: any): void {
  //   this.requestIdVal1 = info.requestId;
  //   this.helpAera1 = info.subjectMaster.subjectName;
  //   this.requestBodyVal1 = info.requestBody;
  //   this.requestTypeVal1 = info.requestType;
  //   this.priorityVal1 = info.priority;
  //   this.statusVal1 = info.status;
  //   this.availableDateVal1 = info.availableDate;
  //   this.startTimeVal1 = info.startTime;
  //   this.endTimeVal1 = info.endTime;
  //   this.subjectNameVal1 = info.subjectName;
  //   this.commentTextVal1 = info.commentText;
  //   this.createdDate1 = info.createdDate;
  // }

  ngOnInit() {
    this.myDateValue = new Date();


    this.loadTutortRequestsCall();




    // this.dtOptions1 = {
    //   columns: [{
    //     title: 'Request ID',
    //     data: 'requestId'
    //   }, {
    //     title: 'Created On',
    //     data: 'createdDate'
    //   }, {
    //     title: 'Help Aera',
    //     data: 'subjectMaster.subjectName'
    //   }, {
    //     title: 'Status',
    //     data: 'status'
    //   }, {
    //     title: 'Request Body',
    //     data: 'requestBody'
    //   }, {
    //     title: 'Request Type',
    //     data: 'requestType'
    //   }, {
    //     title: 'Priority',
    //     data: 'priority'
    //   }, {
    //     title: 'Available Date',
    //     data: 'availableDate'
    //   }, {
    //     title: 'Start Time',
    //     data: 'startTime'
    //   }, {
    //     title: 'End Time',
    //     data: 'endTime'
    //   }
    //   ],
    //   pageLength: 5,
    //   rowCallback: (row: Node, data: any[] | Object, index: number) => {
    //     const self = this;
    //     // Unbind first in order to avoid any duplicate handler
    //     // (see https://github.com/l-lin/angular-datatables/issues/87)
    //     $('td', row).unbind('click');
    //     $('td', row).bind('click', () => {
    //       self.someClickHandler(data);
    //     });
    //     return row;
    //   }
    // };

    // this.http.get('../assets/data/studentdetails2.json')
    //   .pipe(map(this.extractData))
    //   .subscribe(tutorData => {
    //     this.tutorData = this.currentUser.openRequestSet;
    //     // Calling the DT trigger to manually render the table
    //     this.dtTrigger.next();
    //   });


    // this.http.get('../assets/data/studentdetails1.json')
    //   .pipe(map(this.extractData))
    //   .subscribe(persons => {
    //     this.persons = this.currentUser.tutorRequestSet;
    //     // Calling the DT trigger to manually render the table

    //     this.dtTrigger.next();
    //   });
  }

  openStudentDetails() {
    this.showCreateStudentRequest = true;
  }
  openRequestDetails() {
    this.showCreateStudentRequest = false;
  }


  tutorAcceptedRequest() {

    this.requestJson = {
      'commentId': '',
      'commentText': ' Accepted',
      'createdDate': '',
      'request': {
        'requestId': this.requestIdVal
      },
      'tutorMaster': {
        'tutorId': this.currentUser.tutorId
      }
    };

    


    console.log('request data' + JSON.stringify(this.requestJson));
    this.tutorServiceApi.tutorCommentRequests(this.requestJson).subscribe(data => {
      // this.showtutorSignInForm = true;
      console.log(data);
      alert('Request Accepted');
     // this.router.navigate(['/login']);
    });


  }



  loadTutortRequestsCall() {

    this.dtOptions = {
      columns: [{
        title: 'Request ID',
        data: 'requestId'
      }, {
        title: 'Created On',
        data: 'createdDate'
      }, {
        title: 'Help Aera',
        data: 'subjectMaster.subjectName'
      }, {
        title: 'Status',
        data: 'status'
      }, {
        title: 'Request Body',
        data: 'requestBody'
      }, {
        title: 'Request Type',
        data: 'requestType'
      }, {
        title: 'Priority',
        data: 'priority'
      }, {
        title: 'Available Date',
        data: 'availableDate'
      }, {
        title: 'Start Time',
        data: 'startTime'
      }, {
        title: 'End Time',
        data: 'endTime'
      }
      ],
      pageLength: 5,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };

    this.tutorServiceApi.getTutorRequests(this.currentUser.tutorId).subscribe(data => {
      // this.showStudentSignInForm = true;

      console.log(data);
      this.totalRequestCount = data.totalRequestCount;
      this.scheduleRequestCount = data.scheduleCount;
      this.inProgressRequestCount = data.inProgressCount;
      this.openRequestCount = data.openRequestCount;

      this.tutorData = data.openRequestList;
      // Calling the DT trigger to manually render the table

      this.dtTrigger.next();
    });
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

}
