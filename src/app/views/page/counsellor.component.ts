import { Component, OnInit } from '@angular/core';
import { CounsellorServiceService } from "../../shared/counsellor-service.service";

@Component({
  templateUrl: 'counsellor.component.html'
})
export class CounsellorComponent implements OnInit {

  ConsellorData: any;

  showRequestDetails: boolean = false;

  constructor(

    public restApiCounsellorService: CounsellorServiceService

  ) { }

  ngOnInit() {
    this.showRequestDetails = false;
  }

  CounsellorData: any;
  studIdVal: string = "";

  counsellorRequestJson: any;


  onSubmitRequest(form: any) {
    // this.studIdVal = "'" + form.counsellorId + "'";
    this.counsellorRequestJson = {

      "counsellorId": form.counsellorId,
      "name": form.counsellorName
    }

    return this.restApiCounsellorService.createCounsellor(this.counsellorRequestJson).subscribe((data: {}) => {
      // this.showRequestDetails = true;
      //this.counsellorData = data;
      console.log(data);
      window.alert("Success");
    })

  }


  // Get counsellors list
  loadcounsellors(form : any) {
    let id = form.counsellorId
    return this.restApiCounsellorService.getCounsellor(id).subscribe((data: {}) => {
      this.showRequestDetails = true;
      this.ConsellorData = data;
      console.log(data);
    })
  }

}
