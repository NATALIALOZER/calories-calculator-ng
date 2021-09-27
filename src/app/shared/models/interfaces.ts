import {CalendarEvent} from 'angular-calendar';

export interface IEvent extends CalendarEvent {
  display: boolean;
  kcal: number;
}
