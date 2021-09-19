import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitializeComponent } from './initialize.component';
import {InitializeRoutingModule} from "./initialize-routing.module";



@NgModule({
  declarations: [
    InitializeComponent
  ],
  imports: [
    CommonModule,
    InitializeRoutingModule
  ]
})
export class InitializeModule { }
