import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {CalendarRoutingModule} from "./calendar-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class CalendarModule { }
