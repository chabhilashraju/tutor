import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorComponent } from './tutor.component';
import { StudentinfoComponent } from './studentinfo.component';

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
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
