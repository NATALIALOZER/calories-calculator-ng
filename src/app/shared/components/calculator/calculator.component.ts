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
  currentKcal: number = 0;

  public getSum(): any {
    this.currentKcal = 0;
    for (let event in this.events)  {
      const start = `${this.events[event].start.getDate()}, ${this.events[event].start.getMonth()}`;
      const viewDate = `${this.viewDate.getDate()}, ${this.viewDate.getMonth()}`;
      if (start == viewDate ) {
        this.currentKcal += +this.events[event].kcal;
      }
    }
    return this.currentKcal;
  }
}
