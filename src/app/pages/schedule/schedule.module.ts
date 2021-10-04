import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import {ScheduleRoutingModule} from './schedule-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ImageUploadModule} from '../../shared/components/image-upload/image-upload.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule,
    SharedModule,
    MatButtonModule,
    MatInputModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [ScheduleComponent]
})
export class ScheduleModule { }
