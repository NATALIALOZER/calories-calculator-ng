import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


export interface PeriodicElement {
  /*name: string;*/
  position: string;
}

export interface Month {

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


  constructor() { }

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
    this.day = +date.toString().slice(8,10)
    console.log(this.day)
    this.settedDate.setDate(this.day+7)
    if(this.day+7 >= 31){
      console.log("назад месяц не меняет!Исправить!!!")
      console.log(this.settedDate.toLocaleString("en-us", { month: "long" }))
      this.defaultMonth = this.settedDate.toLocaleString("en-us", { month: "long" })
    }
    this.getDay()
  }

  selectPreWeek(date:string){
    this.day = +date.toString().slice(8,10)
    console.log(this.day)
    this.settedDate.setDate(this.day-7)
    console.log(this.settedDate)
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
    /*this.getCurrentDate()*//*
    console.log(this.settedDate)*/
    this.getDay()
  }



}
