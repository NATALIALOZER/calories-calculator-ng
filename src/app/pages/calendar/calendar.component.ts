import {Component, OnInit, ViewChild} from '@angular/core';
import {MealService} from "../meal/meal.service";
import {Meal} from "../meal/meal.component";


export interface PeriodicElement {
  position: string;
  id: number;
}

export interface Month {

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: '01:00', id: 1},
  {position: '02:00', id: 2},
  {position: '03:00', id: 3},
  {position: '04:00', id: 4},
  {position: '05:00', id: 5},
  {position: '06:00', id: 6},
  {position: '07:00', id: 7},
  {position: '08:00', id: 8},
  {position: '09:00', id: 9},
  {position: '10:00', id: 10},
  {position: '11:00', id: 11},
  {position: '12:00', id: 12},
  {position: '13:00', id: 13},
  {position: '14:00', id: 14},
  {position: '15:00', id: 15},
  {position: '16:00', id: 16},
  {position: '17:00', id: 17},
  {position: '18:00', id: 18},
  {position: '19:00', id: 19},
  {position: '20:00', id: 20},
  {position: '21:00', id: 21},
  {position: '22:00', id: 22},
  {position: '23:00', id: 23},
  {position: '24:00', id: 24},

];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  mealText!: Meal;

  displayedColumns: string[] = ['demo-position', 'demo-mon', 'demo-tue', 'demo-wed', 'demo-thu', 'demo-fri', 'demo-sat', 'demo-sun'];
  dataSource = ELEMENT_DATA;

  monday:any
  tuesday:any
  wednesday:any
  thursday:any
  friday:any
  saturday:any
  sunday:any

  arr:any = []
  currentDate = new Date();
  settedDate = this.currentDate
  /*monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];*/
  /*month: string = this.monthNames[this.currentDate.getMonth()]*/
  day: number = this.currentDate.getDate()

  month: number = this.currentDate.getMonth()
  year: number = this.currentDate.getFullYear()



  monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  dayNames: Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  defaultMonth: string = this.monthNames[this.currentDate.getMonth()]


  constructor(private meal: MealService) { }

  getColor(element:number):string{
    if(element>=1510){
      return 'red'
    } if (element<=1230){
      return 'yellow'
    } else {
      return 'blue'
    }
  }

  selectNextWeek(date:string){
    let current_month =  this.settedDate.getMonth()
    let next_month = current_month+1
    let data_1: Date = new Date(this.year, current_month, 1)
    let data_2: Date = new Date(this.year, next_month, 1)
    // @ts-ignore
    let num_days_current_month = Math.round((data_2 - data_1)/1000/3600/24)
    this.day = +date.toString().slice(8,10)
    let c_date = this.day+7
    if(c_date<=num_days_current_month+1){

      this.settedDate.setDate(this.day+7)
    } else {
      this.settedDate.setDate(6)
    }
    this.defaultMonth = this.settedDate.toLocaleString("en-us", { month: "long" })
    this.getDay()
  }

  selectPreWeek(date:string){
    this.day = +date.toString().slice(8,10)
    let setm = this.monthNames.indexOf(this.defaultMonth)
    this.settedDate.setMonth(setm)

    this.settedDate.setDate(this.day-7)
    this.defaultMonth = this.settedDate.toLocaleString("en-us", { month: "long" })
    this.getDay()
  }

  selectMonth(event: any) {
    this.defaultMonth = event.value;
    let setm = this.monthNames.indexOf(this.defaultMonth)

    this.settedDate.setMonth(setm)
    this.getDay()
  }

  getDay() {
    this.arr = []
    for(let i=0;i<=6;i++){
      let d = this.settedDate;
      let day = d.getDay()
      let diff = d.getDate() - (day-i) + (day == 0 ? -6:1)
      this.arr.push(new Date(d.setDate(diff)))
    }
    /*console.log(this.arr)*/
    this.monday = this.arr[0]
    this.tuesday = this.arr[1]
    this.wednesday = this.arr[2]
    this.thursday = this.arr[3]
    this.friday = this.arr[4]
    this.saturday = this.arr[5]
    this.sunday = this.arr[6]
  }

  ngOnInit(): void {
    this.getDay()
    this.meal.isHtml.subscribe((html: any) => {
      this.mealText = html
      console.log(this.mealText.time)
      let that_day = this.day
      let time = this.mealText.time
      let pos = ELEMENT_DATA.find((el: { position: any; })=>el.position==time)
      console.log(pos)
    });
    this.setDataToCell()
    /*console.log(this.isHtml)*/

  }

  setData(event: any) {
    /*let cell = event.target*/
    /*cell.classList.add('blue_cell')*/
    /*console.log(cell.classList)*/
    /*console.log(cell.)*/
  }

  setDataToCell() {

    /*let cell = event.target*/
    /*cell.classList.add('blue_cell')*/
    /*console.log(cell.classList)*/
    /*console.log(cell.)*/
  }

}
