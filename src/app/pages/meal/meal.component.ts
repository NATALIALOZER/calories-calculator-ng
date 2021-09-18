import {Component, OnInit, ViewChild} from '@angular/core';
import {MealService} from "./meal.service";

/*export interface Meal {
  title: string;
  time: any;
  /!*kcal: number
  fats: number;
  proteins: number;
  carbohydrates: number;*!/
}*/

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  html:string = '';
  title: any;
  time: any;
  kcal: any;
  fats: any;
  proteins: any;
  carbohydrates: any;

  /*meal_data: any*/
  date: Date = new Date()
  month: number = this.date.getMonth()
  day: number = this.date.getDate()

  constructor(private meal: MealService) { }



  clickAdd(html:any): any {
    if(this.title&&this.time&&this.kcal&&this.fats&&this.proteins&&this.carbohydrates){
      this.html = html
      html.style.display = 'none'
      html.previousSibling.style.display = 'none'
      html.nextSibling.style.display = 'none'
      html.parentElement.previousSibling.firstChild.firstChild.innerHTML = 'Back'
      let storage: any = {};
      if(this.time.length<5){
        this.time = "0"+this.time
      }
      let date_id = `${this.day}/${this.month+1}/${this.time}`
      storage['info']  = {t:this.title,k:this.kcal,f:this.fats,p:this.proteins,c:this.carbohydrates}
      storage['time'] = this.time;
      storage['date'] = this.day
      this.meal.setStorage(date_id, storage)
      /*localStorage.clear()*/
    }
    else {
      alert("Не все данные указаны!")
    }
  }

  ngOnInit(): void {

  }
}
