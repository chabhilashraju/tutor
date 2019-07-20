import { Component, OnInit } from '@angular/core';
import { TutorRegistrationService } from '../../shared/tutor-registration.service';
import { Router } from '@angular/router';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: 'tutorregister.component.html'
})
export class TutorRegisterComponent implements OnInit {

  district: string;
  school: string;
  requestJson: any;

  // tslint:disable-next-line: no-inferrable-types
  tutorTypeVal: boolean = false;

  get districts(): string[] {
    return Array.from(this.map.keys());
  }

  get schools(): string[] | undefined {
    return this.map.get(this.district);
  }

  private map = new Map<string, string[]>([
    ['District1', ['School1', 'School2', 'School3']],
    ['District2', ['School1', 'School2', 'School3']],
  ]);



  // tslint:disable-next-line: no-inferrable-types
  showStudentForm: boolean = true;

  // tslint:disable-next-line: no-inferrable-types
  showtutorSignInForm: boolean = false;

  // tslint:disable-next-line: no-inferrable-types
  showTutorForm: boolean = true;
  constructor(private tutorRegistrationService: TutorRegistrationService, private router: Router) {

  }
  ngOnInit() { }

  onTutorRequestCreate(form: any) {
    console.log('FORM Data' + JSON.stringify(form));
    if (!this.showtutorSignInForm) {
      this.tutorRegistrationService.getStudent(form.studentId).subscribe(data => {
        this.showtutorSignInForm = true;
        console.log(data);
      });
    } else {
      this.requestJson = {
        'userName': form.tutorUserName,
        'password': form.tutorPassword,
        'masterType': 'tutor',
        'firstName': form.tutorFirstName,
        'lastName': form.tutorLastName,
        'mobile': form.tutorPhoneNo,
        'tutortype': form.tutorType,
        'email': form.tutorEmailId,
        'studentMaster': {
          'studentId': form.studentId
        },
        'biography': form.tutorBiography,
        'subjectMasterSet': [{
          'subjectId': form.tutorSubjects,
          'coreSubjectMaster': {
            'coreSubjectId': 1
          }
        }
        ]
      };

      console.log('request data' + JSON.stringify(this.requestJson));
      this.tutorRegistrationService.tutorRegistration(this.requestJson).subscribe(data => {
        // this.showtutorSignInForm = true;
        console.log(data);
        alert('Registration Success');
        this.router.navigate(['/login']);
      });
    }
  }

  onChange(selectedValue) {
    if (selectedValue === 'student') {
      this.tutorTypeVal = false;
    } else {
      this.tutorTypeVal = true;
    }
    console.log(selectedValue);
  }

  showStudentRegForm() {
    this.showStudentForm = true;
    this.showTutorForm = false;
    this.showtutorSignInForm = false;
  }

  showTutorRegForm() {
    this.showStudentForm = false;
    this.showTutorForm = true;
    this.showtutorSignInForm = false;
  }

  showStudentRegSignInForm() {
    this.showStudentForm = false;
    this.showTutorForm = false;
    this.showtutorSignInForm = true;
  }

}
