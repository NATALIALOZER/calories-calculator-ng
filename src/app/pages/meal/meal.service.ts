import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor() { }
  public isHtml = new Subject();

  setHtml(data: any) {
    this.isHtml.next(data);
    /*console.log(data)*/
  }
}

