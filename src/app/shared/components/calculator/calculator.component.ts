import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @Input() public viewDate!: Date
  constructor() { }

  ngOnInit(): void {

  }

}
