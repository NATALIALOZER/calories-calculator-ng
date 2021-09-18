import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  structure_data: any

  constructor() {
  }

  public isHtml = new Subject();

  getFromMealToCalendar(data: any) {
    this.isHtml.next(data);
  }

  setStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log('data was set!')
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getStorage(key: any) {
    try {
      // @ts-ignore
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }


}
