import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from "../../shared/student-service.service";
import { NgStyle } from '@angular/common';

@Component({
  templateUrl: 'student.component.html'
})
export class StudentComponent implements OnInit {
  StudentData: any;
  RequestData : any;
  StudentReuestData : any;
  studIdVal: string = "";
  showRequestDetails: boolean = false;
  showStudentDetails: boolean = false;
  studentRequestJson:any;
  requestJson: any;
  constructor(


    public restApiStudentService: StudentServiceService


  ) { }
  ngOnInit() {
    this.showRequestDetails = false;
    this.showStudentDetails = false;
  }

  onSubmitRequest(form: any) {
    // this.studIdVal = "'" + form.studentId + "'";
    this.studentRequestJson = {

      "studentId": "",
      "name": form.studentName
    }

    return this.restApiStudentService.createStudent(this.studentRequestJson).subscribe((data: {}) => {
      // this.showRequestDetails = true;
      //this.StudentData = data;
      console.log(data);
      window.alert("Success");
    })

  }

  // Ceate Request 
  onRequestCreate(form: any) {
    this.requestJson = {
        "requestId": "",
        "requestText": form.studentRequestTextArea,
        "student":{
          "studentId": form.studentRequestName
        },
        "tutor":{
          "tutorId": form.studentRequestTutorName
        },
        "counsellor": {
          "counsellorId": form.studentRequestCounsellorName
        },
        "createdDate": "2019-05-26"
      }
    
    return this.restApiStudentService.createStudentRequest(this.requestJson).subscribe((data: {}) => {
       console.log(" Successfully Created " + data);
       window.alert("Success");
    })

  }




  // Get Request details
  loadRequestDetails(idVal:any) {

    let id = idVal;
    return this.restApiStudentService.getRequest(id).subscribe((data: {}) => {
      this.showRequestDetails = true;
      this.RequestData = data;
      console.log(data);
    })
  }

  
  // Get Request details
  loadStudentDetails(idVal:any) {

    let id = idVal;
    return this.restApiStudentService.getStudent(id).subscribe((data: {}) => {
      this.showStudentDetails = true;
      this.StudentData = data;
      console.log(data);
    })
  }

    // Get Request details
    getStudentDetails(idVal:any) {

      let id = idVal;
      return this.restApiStudentService.getStudent(id).subscribe((data: {}) => {
       // this.showStudentDetails = true;
        this.StudentReuestData = data;
        console.log(data);
      })
    }

}
