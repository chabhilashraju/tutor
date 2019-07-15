import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {


  loginForm: FormGroup;
  selected: string;
  states: string[] = [
    'Geometry',
    'Physics',
    'Chemistry'
  ];

  private map = new Map<string, string[]>([
    ['District1', ['School1', 'School2', 'School3']],
    ['District2', ['School1', 'School2', 'School3']],
  ]);

  schoolDistrict: string;
  city: string;

  get schoolDistricts(): string[] {
    return Array.from(this.map.keys());
  }

  get schoolMasterList(): string[] | undefined {
    return this.map.get(this.schoolDistrict);
  }

  dropdownVals = [
    {
      'districtId': 1,
      'name': 'District 1',
      'schoolMasterList': [
        {
          'schoolId': '2',
          'name': 'School 1',
          'email': 'bharathi@acm.com',
          'phone': '1235656',
          'studentMaster': []
        },
        {
          'schoolId': '3',
          'name': 'School 2',
          'email': 'bachpan@bap.com',
          'phone': '8767656',
          'studentMaster': []
        }
      ]
    },
    {
      'districtId': 2,
      'name': 'District 2',
      'schoolMasterList': [
        {
          'schoolId': '1',
          'name': 'School 1',
          'email': 'RCM@rcm.com',
          'phone': '1234567',
          'studentMaster': [
            {
              'studentId': '1',
              'firstName': 'Santhosh',
              'lastName': 'Kumar',
              'phone': '8500323364',
              'email': 'santhoshaligi@gmail.com'
            }
          ]
        }
      ]
    }
  ];


  // tslint:disable-next-line: no-inferrable-types
  showStudentForm: boolean = true;

  // tslint:disable-next-line: no-inferrable-types
  showStudentSignInForm: boolean = false;

  // tslint:disable-next-line: no-inferrable-types
  showTutorForm: boolean = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      stdIdnumber: [''],
      selected: ['']
    });


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
