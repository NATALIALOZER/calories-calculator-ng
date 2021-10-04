import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalculatorComponent} from './components/calculator/calculator.component';

@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CalculatorComponent]
})
export class SharedModule { }
