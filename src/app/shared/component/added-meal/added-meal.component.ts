import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-added-meal',
  templateUrl: './added-meal.component.html',
  styleUrls: ['./added-meal.component.scss']
})
export class AddedMealComponent{
  @Input() title: any;
  @Input() time: any;
  @Input() kcal: any;
  @Input() fats: any;
  @Input() proteins: any;
  @Input() carbohydrates: any;
  constructor() { }

  ngOnInit(): void {

  }

}
