import { Injectable } from '@angular/core';
import {IEvent} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public set(key: string, data: IEvent[]): void {
    if (key) {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    }
  }
  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      console.error('Error getting data from localStorage', e);
    }
  }
}
