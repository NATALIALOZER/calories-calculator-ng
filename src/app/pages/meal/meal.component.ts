import {Component, OnInit, ViewChild} from '@angular/core';
import {MealService} from "./meal.service";

export interface Meal {
  title: string;
  time: any;
  /*kcal: number
  fats: number;
  proteins: number;
  carbohydrates: number;*/
}

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

  meal_data: Meal[] = [];

  constructor(private meal: MealService) { }



  clickAdd(html:any): any {
    if(this.title&&this.time&&this.kcal&&this.fats&&this.proteins&&this.carbohydrates){
      this.html = html
      html.style.display = 'none'
      html.previousSibling.style.display = 'none'
      html.nextSibling.style.display = 'none'
      html.parentElement.previousSibling.firstChild.firstChild.innerHTML = 'Back'
      this.meal_data.push(this.title,this.time)

      this.meal.setHtml(this.meal_data)
    }
    else {
      alert("Не все данные указаны!")
    }
  }

  ngOnInit(): void {

  }
}
