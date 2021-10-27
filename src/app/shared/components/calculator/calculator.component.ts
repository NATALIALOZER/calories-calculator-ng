import {Component, Input} from '@angular/core';
import {IEvent} from '../../models/interfaces';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  @Input() public viewDate!: Date;
  @Input() public events!: IEvent[];

  public mondayKcal: number = 0;
  public tuesdayKcal: number = 0;
  public wednesdayKcal: number = 0;
  public thursdayKcal: number = 0;
  public fridayKcal: number = 0;
  public saturdayKcal: number = 0;
  public sundayKcal: number = 0;
  public currentKcalArray: number[] = [];

  private currentKcal: number = 0;


  public getSum(): number {
    this.currentKcal = 0;
    for (const event in this.events)  {
      const start = `${this.events[event].start.getDate()}, ${this.events[event].start.getMonth()}`;
      const viewDate = `${this.viewDate.getDate()}, ${this.viewDate.getMonth()}`;
      if (start === viewDate ) {
        this.currentKcal += +this.events[event].kcal;
      }
    }
    this.getWeekCal();
    return this.currentKcal;
  }

  public getWeekCal(): void {
    this.currentKcalArray = [];

    this.sundayKcal = 0;
    this.mondayKcal = 0;
    this.tuesdayKcal = 0;
    this.wednesdayKcal = 0;
    this.thursdayKcal = 0;
    this.fridayKcal = 0;
    this.saturdayKcal = 0;
    const weekDaysArray = [];
    const hourOfMillisecs = 3600000;
    const hoursOfOneWeek = 168;
    const startTimeOfViewYear = (new Date(this.viewDate.getFullYear(), 0, 1)).getTime();
    const viewTime = this.viewDate.getTime();
    const pastTimeOfStartViewYear = viewTime - startTimeOfViewYear;
    const viewWeek = Math.floor((pastTimeOfStartViewYear / hourOfMillisecs / hoursOfOneWeek));
    for (const event in this.events)  {
      const currentDateTime = this.events[event].start;
      const startTimeOfCurrentYear = (new Date(currentDateTime.getFullYear(), 0, 1)).getTime();
      const currentTime = currentDateTime.getTime();
      const pastTimeOfStartCurrentYear = currentTime - startTimeOfCurrentYear;
      const eventWeek = Math.floor((pastTimeOfStartCurrentYear / hourOfMillisecs / hoursOfOneWeek));
      if (eventWeek === viewWeek && startTimeOfViewYear === startTimeOfCurrentYear) {
        weekDaysArray.push(this.events[event]);
      }
    }

    weekDaysArray.forEach(item => {
      const day = item.start.toString().slice(0, 3);
      switch (day) {
        case 'Sun':
          this.saturdayKcal += +item.kcal;
          break;
        case 'Mon':
          this.mondayKcal += +item.kcal;
          break;
        case 'Tue':
          this.tuesdayKcal += +item.kcal;
          break;
        case 'Wen':
          this.wednesdayKcal += +item.kcal;
          break;
        case 'Thu':
          this.thursdayKcal += +item.kcal;
          break;
        case 'Fri':
          this.fridayKcal += +item.kcal;
          break;
        case 'Sat':
          this.sundayKcal += +item.kcal;
          break;
        default:
          break;
      }
    });
    this.currentKcalArray.push(this.sundayKcal);
    this.currentKcalArray.push(this.mondayKcal);
    this.currentKcalArray.push(this.tuesdayKcal);
    this.currentKcalArray.push(this.wednesdayKcal);
    this.currentKcalArray.push(this.thursdayKcal);
    this.currentKcalArray.push(this.fridayKcal);
    this.currentKcalArray.push(this.saturdayKcal);
  }

  public getColor( element: number ): string {
    if (element >= 1510) {
      return 'red';
    }
    if (element <= 1230 ) {
      return 'yellow';
    } else {
      return 'blue';
    }
  }
}
