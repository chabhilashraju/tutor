import { Component, OnInit } from '@angular/core';
import { StudentRegistrationService } from '../../shared/student-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  district: string;
  school: string;
  requestJson: any;

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
  showStudentSignInForm: boolean = false;

  // tslint:disable-next-line: no-inferrable-types
  showTutorForm: boolean = false;
  constructor(private studentServiceApi: StudentRegistrationService, private router: Router) {

  }
  ngOnInit() { }

  onRequestCreate(form: any) {
    console.log('FORM Data' + form.studentId);
    if (!this.showStudentSignInForm) {
      this.studentServiceApi.getStudent(form.studentId).subscribe(data => {
        this.showStudentSignInForm = true;
        console.log(data);
      });
    } else {

      this.requestJson = {
        'userName': form.studentUserName,
        'password': form.studentPassword,
        'masterType': 'student',
        'studentId': form.studentId
      };

      this.studentServiceApi.studentRegistration(this.requestJson).subscribe(data => {
        // this.showStudentSignInForm = true;
        console.log(data);
        alert('Registration Success');
        this.router.navigate(['/login']);
      });
    }

  }

  showStudentRegForm() {
    this.showStudentForm = true;
    this.showTutorForm = false;
    this.showStudentSignInForm = false;
  }


  showTutorRegForm() {
    this.showStudentForm = false;
    this.showTutorForm = true;
    this.showStudentSignInForm = false;
  }

  showStudentRegSignInForm() {
    this.showStudentForm = false;
    this.showTutorForm = false;
    this.showStudentSignInForm = true;
  }

}
