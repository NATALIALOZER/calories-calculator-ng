import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import {ScheduleRoutingModule} from "./schedule-routing.module";
import {FormsModule} from "@angular/forms";
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {DemoUtilsModule} from "../../shared/component/demo-utils/module";





@NgModule({
  declarations: [
    ScheduleComponent,

  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FormsModule,
    NgbModalModule,
    CalendarModule,
    /*DemoUtilsModule*/
    DemoUtilsModule
  ],
  exports:[ScheduleComponent]
})
export class ScheduleModule { }
