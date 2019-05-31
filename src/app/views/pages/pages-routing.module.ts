import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CounsellorComponent} from './counsellor/counsellor.component'
import {StudentComponent} from './student/student.component'
import {TutorComponent} from './tutor/tutor.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'pages'
    },
    children: [
      {
        path: '',
        redirectTo: 'student'
      },
      {
        path: 'student',
        component: StudentComponent,
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
export class PagesRoutingModule {}
