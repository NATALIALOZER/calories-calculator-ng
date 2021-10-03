import {CalendarEvent} from 'angular-calendar';

export interface IEvent extends CalendarEvent {
  kcal: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
  image: ImageSnippet;
  display: boolean;
}

export interface ImageSnippet {
  file?: File;
  src: string;
}

export interface IPersonal {
  gender: string;
  weight: number;
  height: number;
  min: number;
  max: number;
  fats: number;
  proteins: number;
  carbohydrates: number;
  norma: number;
}
