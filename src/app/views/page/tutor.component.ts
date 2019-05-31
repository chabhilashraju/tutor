import { Component } from '@angular/core';
import { TutorServiceService } from "../../shared/tutor-service.service";

@Component({
  templateUrl: 'tutor.component.html'
})
export class TutorComponent {


  TutorData: any;
  TutorRequestData: any;
  tutorIdVal: string = "";
  showRequestDetails: boolean = false;
  tutorRequestJson: any;
  requestJson: any;
  constructor(


    public restApiTutorService: TutorServiceService


  ) { }
  ngOnInit() {
    this.showRequestDetails = false;
  }

  onSubmitRequest(form: any) {

    this.tutorRequestJson = {

      "tutorId": "",
      "name": form.tutorName
    }

    return this.restApiTutorService.createTutor(this.tutorRequestJson).subscribe((data: {}) => {

      console.log(data);
    })

  }


  onCommentCreate(form: any) {

    this.requestJson =
      {
        "commentId": "",
        "commentText": form.commentRequestTextArea,
        "tutorId": form.tutorRequestTutorName,
        "request": {
          "requestId": form.commentRequestName
        }
      }

    return this.restApiTutorService.createCommentRequest(this.requestJson).subscribe((data: {}) => {
      console.log(data);
    })

  }



  // Get counsellors list
  getTutorDetails(idVal: any) {

    let id = idVal;
    return this.restApiTutorService.getTutor(id).subscribe((data: {}) => {
      //  this.showRequestDetails = true;
      this.TutorRequestData = data;


      console.log(data);
    })
  }


  // Get counsellors list
  loadTutorDetails(form: any) {

    let id = form.tutorId;
    return this.restApiTutorService.getTutor(id).subscribe((data: {}) => {
      this.showRequestDetails = true;
      this.TutorData = data;
      console.log(data);
    })
  }



}
