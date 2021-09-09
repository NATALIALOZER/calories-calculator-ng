import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  /*name: string;*/
  position: string;
  /*weight: number;
  symbol: string;*/
}

const ELEMENT_DATA: PeriodicElement[] = [
  /*{position: '08:00', name: 'Hydrogen', weight: 1.0079, symbol: 'H'},*/
  {position: '01:00'},
  {position: '02:00'},
  {position: '03:00'},
  {position: '04:00'},
  {position: '05:00'},
  {position: '06:00'},
  {position: '07:00'},
  {position: '08:00'},
  {position: '09:00'},
  {position: '10:00'},
  {position: '11:00'},
  {position: '12:00'},
  {position: '13:00'},
  {position: '14:00'},
  {position: '15:00'},
  {position: '16:00'},
  {position: '17:00'},
  {position: '18:00'},
  {position: '19:00'},
  {position: '20:00'},
  {position: '21:00'},
  {position: '22:00'},
  {position: '23:00'},
  {position: '24:00'},

];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  displayedColumns: string[] = ['demo-position', 'demo-mon', 'demo-tue', 'demo-wed', 'demo-thu', 'demo-fri', 'demo-sat', 'demo-sun'];
  dataSource = ELEMENT_DATA;
  calories: Array<number> = [1315,1515,380,1518]
  bad_calories: Array<number> = []
  norm_calories: Array<number> = []
  less_calories: Array<number> = []

  /*currentDate = new Date();
  monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  month: string = this.monthNames[this.currentDate.getMonth()]*/

  constructor() { }

  colorDayCalories(){
    this.bad_calories = this.calories.filter(el => el>1510)
    this.norm_calories = this.calories.filter(el => el<=1510&&el>=1230)
    this.less_calories = this.calories.filter(el => el<1230)
  }
  getColor(element:number){

  }

  ngOnInit(): void {
  }

}
