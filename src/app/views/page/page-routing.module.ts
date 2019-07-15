import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import { TutorComponent } from './tutor.component';
import { CounsellorComponent } from './counsellor.component';
import {StudentinfoComponent} from './studentinfo.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Page'
    },
    children: [
      {
        path: '',
        redirectTo: 'studentdetails'
      },
      {
        path: 'student',
        component: StudentComponent,
        data: {
          title: 'Student'
        }
      },
      {
        path: 'studentdetails',
        component: StudentinfoComponent,
        data: {
          title: 'Student'
        }
      },
      {
        path: 'tutor',
        component: TutorComponent,
        data: {
          title: 'Tutor'
        }
      },
      {
        path: 'counsellor',
        component: CounsellorComponent,
        data: {
          title: 'Counsellor'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
