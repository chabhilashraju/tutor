import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { StudentComponent } from './student/student.component';
import { TutorComponent } from './tutor/tutor.component';
import { CounsellorComponent } from './counsellor/counsellor.component';

// Pages Routing
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [
    CounsellorComponent,
    StudentComponent,
    TutorComponent]
    ,
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
