import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { Student } from '../../shared/student';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { StudentInfoService } from '../../shared/student-info.service';
import { StudentRegistrationService } from '../../shared/student-registration.service';
// import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  requestSet: any;
  gradeMaster: any;
  studentId: any;
  tutorId: any;
}

@Component({
  templateUrl: 'studentinfo.component.html'
})
export class StudentinfoComponent implements OnDestroy, OnInit {
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
  createdDate: any;
  helpAera: any;
  requestJson: any;

  totalRequestCount: any;
  scheduleRequestCount: any;
  inProgressRequestCount: any;
  openRequestCount: any;

  // subjects options

  gradeSubjects: any;

  startTime: Date = new Date();
  endTime: Date = new Date();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Student> = new Subject();
  persons: any = [];
  // tslint:disable-next-line: no-inferrable-types
  showCreateStudentRequest: boolean = false;
  myDateValue: Date;
  finalSelectedVal: any;
  reqEndTime: any;
  reqStartTime: any;

  constructor(
    // private studentInfo: StudentInfoService, private http: HttpClient , private router: Router
    private http: HttpClient, private studentServiceApi: StudentRegistrationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!this.currentUser.studentId) {
      this.router.navigate(['/page/tutor']);
    }

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

  ngOnInit() {

    this.gradeSubjects = this.currentUser.gradeMaster.subjectGrade;

    this.myDateValue = new Date();

    this.loadStudentRequestsCall();

    // this.http.get('../assets/data/studentdetails.json')
    //   .pipe(map(this.extractData))
    //   .subscribe(persons => {
    //     this.persons = this.currentUser.requestSet;
    //     // Calling the DT trigger to manually render the table

    //     this.dtTrigger.next();
    //   });

  }

  openStudentDetails() {
    this.showCreateStudentRequest = true;
  }

  onNewRequestCreate(form: any) {
    console.log(JSON.stringify(form));
    // const selectedDateVal = form.datePickerVal;

    const dateMonthVal = form.datePickerVal.toString().split(' ')[1]; // dateTime[0] = date, dateTime[1] = time
    const dateVal = form.datePickerVal.toString().split(' ')[2]; // dateTime[0] = date, dateTime[1] = time
    const dateYearVal = form.datePickerVal.toString().split(' ')[3];

    this.finalSelectedVal = dateYearVal + '-' + dateVal + '-' + dateMonthVal;

    this.reqStartTime = form.startTime.toString().split(' ')[4]; // dateTime[0] = date, dateTime[1] = time
    this.reqEndTime = form.endTime.toString().split(' ')[4]; // dateTime[0] = date, dateTime[1] = time

    console.log(this.finalSelectedVal);
    console.log(this.reqStartTime);
    console.log(this.reqEndTime);

    this.requestJson = {
      'requestId': '',
      'requestBody': form.contentText,
      'requestType': form.typeOfRequestsOption,
      'priority': form.urgencyOption,
      'status': '',
      'availableDate': form.datePickerVal,
      'startTime': this.reqStartTime,
      'endTime': this.reqEndTime,
      'createdDate': '',
      'subjectMaster': {
        'subjectId': form.subjectsVal
      },
      'studentMaster': {
        'studentId': this.currentUser.studentId
      }

    };

    this.studentServiceApi.studentCreateRequest(this.requestJson).subscribe(data => {
      // this.showStudentSignInForm = true;
      console.log(data);
      alert('New Request Successfully created');
      // this.router.navigate(['/login']);
     // this.dtTrigger.unsubscribe();
      this.openRequestDetails();
     // this.loadStudentRequestsCall();
      
    });

  }

  loadStudentRequestsCall() {

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

    this.studentServiceApi.getStudentRequests(this.currentUser.studentId).subscribe(data => {
      // this.showStudentSignInForm = true;
     
      console.log(data);
      this.totalRequestCount = data.totalRequestCount;
      this.scheduleRequestCount = data.scheduleCount;
      this.inProgressRequestCount = data.inProgressCount;
      this.openRequestCount = data.openCount;

      this.persons = data.requestList;
      // Calling the DT trigger to manually render the table
     
      this.dtTrigger.next();
    });
  }

  openRequestDetails() {
    this.showCreateStudentRequest = false;
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
