import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  /*name: string;*/
  position: string;
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
  calories: Array<number> = []
  defaultMonth: string = '';
  currentDateNumber: number = 1;
  currentDateName: string = '';
  previousDayName: string = '';


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

  getCurrentDate(){
    let currentDate = new Date();
    let monthNames: Array<string> = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.defaultMonth = monthNames[currentDate.getMonth()]
    this.currentDateNumber = currentDate.getDate()
    this.currentDateName = currentDate.toLocaleDateString("en-EN", { weekday: 'short' });
  }

  calendar() {
    let dayNames: Array<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let index = dayNames.indexOf(this.currentDateName)

    console.log(this.previousDayName)
  }

  ngOnInit(): void {
    this.getCurrentDate()
    this.calendar()
  }
}
