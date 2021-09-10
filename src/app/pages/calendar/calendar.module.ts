import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {CalendarRoutingModule} from "./calendar-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CalendarComponent
  ],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        MatTableModule,
        MatSelectModule,
        FormsModule
    ]
})
export class CalendarModule { }
