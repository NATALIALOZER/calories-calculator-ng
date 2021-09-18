import {Component, OnInit} from '@angular/core';
import {MealService} from "../meal/meal.service";


export interface PeriodicElement {
  position: string;
  id: number;
  data?: any;
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

let ELEM_CALENDAR: PeriodicElement[] = []

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  mealText: any[] = [];

  displayedColumns: string[] = ['demo-position', 'demo-mon', 'demo-tue', 'demo-wed', 'demo-thu', 'demo-fri', 'demo-sat', 'demo-sun'];
  dataSource = ELEM_CALENDAR;

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
  dataDayOfWeek: any;
  datdat: any;


  monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  dayNames: Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  defaultMonth: string = this.monthNames[this.currentDate.getMonth()]


  num_days_current_month: any;
  c_time: any;




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
    let day = this.day

    day = +date.toString().slice(8, 10)
    let c_date = day + 7
    if (c_date <= this.num_days_current_month + 1) {
      this.settedDate.setDate(day + 7)
    } else {
      this.settedDate.setDate(6)
    }
    this.defaultMonth = this.settedDate.toLocaleString("en-us", {month: "long"})
    this.getDay()
    this.setDataToCell()
  }

  selectPreWeek(date: string) {
    let day = this.day
    day = +date.toString().slice(8, 10)
    let setm = this.monthNames.indexOf(this.defaultMonth)
    this.settedDate.setMonth(setm)

    this.settedDate.setDate(day - 7)
    this.defaultMonth = this.settedDate.toLocaleString("en-us", {month: "long"})
    this.getDay()
    this.setDataToCell()
  }

  selectMonth(event: any) {
    this.defaultMonth = event.value;
    let setm = this.monthNames.indexOf(this.defaultMonth)
    this.settedDate.setMonth(setm)
    this.getDay()
    this.setDataToCell()
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

/*  setDataToCell(): void {
    /!*console.log(this.current_week_dates[3])*!/
    for (let el in ELEMENT_DATA) {
      for(let i in this.current_week_dates){/!*
      console.log(this.current_week_dates[i])*!/
        let key = `${this.current_week_dates[i]}/${this.month+1}/${ELEMENT_DATA[el].position}`
        let pre = this.meal.getStorage(key)

        if(pre){
            if (ELEMENT_DATA[el].position == pre.time) {
              /!*console.log(this.dataDayOfWeek)
              console.log(this.dataDayOfWeek==this.friday_date)
              console.log(ELEMENT_DATA)*!/

                ELEMENT_DATA[el].data = pre.info
              }
            /!*console.log(ELEMENT_DATA[el])*!/
          }
        }
      }
    }
  }*/

/*  setDataToCell(): void{
    for(let i in this.current_week_dates){
      for (let el in ELEMENT_DATA) {/!*
        console.log(this.current_week_dates[i])*!/
        let key = `${this.current_week_dates[i]}/${this.month+1}/${ELEMENT_DATA[el].position}`
        let pre = this.meal.getStorage(key)
        if(pre){/!*
          console.log(this.current_week_dates[i])*!/
          if (ELEMENT_DATA[el].position == pre.time) {


            ELEMENT_DATA[el].data = []
            let storage:any = {}
            storage['date'] = pre.date
            storage['info'] = pre.info
            ELEMENT_DATA[el].data.push(storage)

            this.datdat = ELEMENT_DATA[el].data[0].date
            console.log(this.datdat)
            /!*this.dataDayOfWeek = ELEMENT_DATA[el].data*!/
          }
        }
      }
    }

  }*/

  setDataToCell(): void{
    let current_month = this.settedDate.getMonth()
    let next_month = current_month + 1
    let data_1: Date = new Date(this.year, current_month, 1)
    let data_2: Date = new Date(this.year, next_month, 1)
    // @ts-ignore
    this.num_days_current_month = Math.round((data_2 - data_1) / 1000 / 3600 / 24)


    for(let i=0;i<=24;i++){
      let storage: any = {}
      storage["time"] = i+1
      let arr_d = []
      for(let d = 1;d<=this.num_days_current_month;d++){arr_d.push(d)}
      storage["periodic"] = arr_d
      for(let date in storage.periodic){
        let key = `${date}/${this.settedDate.getMonth()+1}/${i+1}:00`
        let pre = this.meal.getStorage(key)
        if(pre){
          let schedl:any = {}
          let ndate = +date-1
          schedl["date"] = storage.periodic[ndate]
          schedl["meal"] = pre.info
          this.c_time = pre.time.slice(0,2)
          storage.periodic[ndate]=schedl
          this.dataDayOfWeek = storage.periodic[ndate]
        }
      }
      if(ELEM_CALENDAR.length==25){
        ELEM_CALENDAR.splice(0,25,storage)
      } else{ELEM_CALENDAR.push(storage)}
    }
    console.log(ELEM_CALENDAR)


  }



  ngOnInit(): void {
    this.getDay()
    this.setDataToCell()


  }
}
