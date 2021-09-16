import {Component, OnInit, ViewChild} from '@angular/core';
import {MealService} from "../meal/meal.service";


export interface PeriodicElement {
  position: string;
  id: number;
  data?: any;
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
  mealText: any[] = [];

  displayedColumns: string[] = ['demo-position', 'demo-mon', 'demo-tue', 'demo-wed', 'demo-thu', 'demo-fri', 'demo-sat', 'demo-sun'];
  dataSource = ELEMENT_DATA;

  currentDate = new Date();
  settedDate = this.currentDate
  day: number = this.currentDate.getDate()
  month: number = this.currentDate.getMonth()
  year: number = this.currentDate.getFullYear()
  monday: any
  monday_date:any
  tuesday: any
  tuesday_date:any
  wednesday: any
  wednesday_date: any
  thursday: any
  thursday_date:any
  friday: any
  friday_date:any
  saturday: any
  saturday_date:any
  sunday: any
  sunday_date:any
  current_week_dates: any;
  arr: any = []



  monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  dayNames: Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  defaultMonth: string = this.monthNames[this.currentDate.getMonth()]


  constructor(private meal: MealService) {
  }

  getColor(element: number): string {
    if (element >= 1510) {
      return 'red'
    }
    if (element <= 1230) {
      return 'yellow'
    } else {
      return 'blue'
    }
  }

  selectNextWeek(date: string) {
    let current_month = this.settedDate.getMonth()
    let next_month = current_month + 1
    let data_1: Date = new Date(this.year, current_month, 1)
    let data_2: Date = new Date(this.year, next_month, 1)
    // @ts-ignore
    let num_days_current_month = Math.round((data_2 - data_1) / 1000 / 3600 / 24)
    this.day = +date.toString().slice(8, 10)
    let c_date = this.day + 7
    if (c_date <= num_days_current_month + 1) {

      this.settedDate.setDate(this.day + 7)
    } else {
      this.settedDate.setDate(6)
    }
    this.defaultMonth = this.settedDate.toLocaleString("en-us", {month: "long"})
    this.getDay()
  }

  selectPreWeek(date: string) {
    this.day = +date.toString().slice(8, 10)
    let setm = this.monthNames.indexOf(this.defaultMonth)
    this.settedDate.setMonth(setm)

    this.settedDate.setDate(this.day - 7)
    this.defaultMonth = this.settedDate.toLocaleString("en-us", {month: "long"})
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
    for (let i = 0; i <= 6; i++) {
      let d = this.settedDate;
      let day = d.getDay()
      let diff = d.getDate() - (day - i) + (day == 0 ? -6 : 1)
      this.arr.push(new Date(d.setDate(diff)))
    }
    this.monday = this.arr[0]
    this.monday_date = this.monday.getDate()
    this.tuesday = this.arr[1]
    this.tuesday_date = this.tuesday.getDate()
    this.wednesday = this.arr[2]
    this.wednesday_date= this.wednesday.getDate()
    this.thursday = this.arr[3]
    this.thursday_date = this.thursday.getDate()
    this.friday = this.arr[4]
    this.friday_date = this.friday.getDate()
    this.saturday = this.arr[5]
    this.saturday_date = this.saturday.getDate()
    this.sunday = this.arr[6]
    this.sunday_date = this.sunday.getDate()
    this.current_week_dates = []
    this.current_week_dates.push(this.monday_date,this.tuesday_date,this.wednesday_date,this.thursday_date,this.friday_date,this.saturday_date,this.sunday_date)
  }


  ngOnInit(): void {
    this.getDay()
    this.setDataToCell()
  }

  setDataToCell(): void {
    for(let i in this.current_week_dates){

      for (let el in ELEMENT_DATA) {
        let key = `${this.current_week_dates[i]}/${this.month+1}/${ELEMENT_DATA[el].position}`

        let pre = this.meal.getStorage(key)
        if(pre){
          console.log(ELEMENT_DATA[el].position)
          console.log(pre.time)
          console.log(ELEMENT_DATA[el].position == pre.time)
          if (ELEMENT_DATA[el].position == pre.time) {
            ELEMENT_DATA[el].data = pre.info
          }
          /*console.log(ELEMENT_DATA[el])*/
        }
      }
    }
  }
}
