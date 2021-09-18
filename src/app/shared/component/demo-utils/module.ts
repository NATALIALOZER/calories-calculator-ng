import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { DateTimePickerComponent } from './date-time-picker.component';

import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  ],
  declarations: [CalendarHeaderComponent, DateTimePickerComponent],
  exports: [CalendarHeaderComponent, DateTimePickerComponent]
})
export class DemoUtilsModule {}
