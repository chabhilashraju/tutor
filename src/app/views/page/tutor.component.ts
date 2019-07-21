import { Component, OnDestroy, OnInit } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { QueryList, ViewChildren } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

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
  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any>[] = [];


  // @ViewChild(DataTableDirective, { static: false } as any)
  // dtElement: DataTableDirective;

  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<Student> = new Subject();


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

  persons: any = [];
  tutorData: any = [];
  tutorAssignedData: any = [];
  // tslint:disable-next-line: no-inferrable-types
  showCreateStudentRequest: boolean = false;
  myDateValue: Date;

  constructor(
    private http: HttpClient, private tutorServiceApi: TutorRegistrationService
  ) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("currentUser" + this.currentUser);
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

    this.dtTrigger[0] = new Subject<any>();
    this.dtTrigger[1] = new Subject<any>();
    this.loadTutortOpenedRequestsCall();
    this.loadTutortAssignedRequestsCall();

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

      this.loadTutortOpenedRequestsCall();
      this.loadTutortAssignedRequestsCall();

      // this.router.navigate(['/login']);
    });

  }

  loadTutortOpenedRequestsCall() {
    this.dtOptions[0] = {
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
      this.openedRender();
      // this.dtTrigger.next();
    });
  }

  
  loadTutortAssignedRequestsCall() {
 

    this.dtOptions[1] = {
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
      this.tutorAssignedData = data.tutorRequests;
      // Calling the DT trigger to manually render the table
       this.assignedRender();
      // this.dtTrigger.next();
    });
  }



  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger[0].next();    
    });
    setTimeout(() => {
      this.dtTrigger[1].next();    
    });
  }

  ngOnDestroy(): void {
   // Do not forget to unsubscribe the event
    // this.dtTrigger[0].unsubscribe();
    // this.dtTrigger[1].unsubscribe();
    setTimeout(() => {
      this.dtTrigger[0].unsubscribe();    
    });
    setTimeout(() => {
      this.dtTrigger[1].unsubscribe();    
    });
    
  }

  openedRender(): void {

    this.dtElements.forEach((dtElement: DataTableDirective,index: number) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Do your stuff
        if(index === 0)
        {
        dtInstance.destroy();
        setTimeout(() => {
          this.dtTrigger[0].next();    
        });
      }
     
      });
    });
  }

  assignedRender(): void {
 

    this.dtElements.forEach((dtElement: DataTableDirective,index: number) => {
      dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Do your stuff
        if(index === 1)
        {
        dtInstance.destroy();
        setTimeout(() => {
          this.dtTrigger[1].next();    
        });
      }
        
      });
    });

  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

}
