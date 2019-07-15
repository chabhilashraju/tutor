// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { StudentComponent } from './student.component';

// Forms Component
import { TutorComponent } from './tutor.component';

import { CounsellorComponent } from './counsellor.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';


// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Components Routing
import { PageRoutingModule } from './page-routing.module';


// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

import { StudentinfoComponent } from './studentinfo.component';
import { DataTablesModule } from 'angular-datatables';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PageRoutingModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    StudentComponent,
    TutorComponent,
    CounsellorComponent,
    StudentinfoComponent
  ]
})
export class PageModule { }
