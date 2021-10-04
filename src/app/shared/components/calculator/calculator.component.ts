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
  public currentKcal: number = 0;

  public getSum(kcal: number): any {
    return this.currentKcal += +kcal;
  }
}
