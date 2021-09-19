import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitializeComponent } from './initialize.component';
import {InitializeRoutingModule} from "./initialize-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    InitializeComponent
  ],
  imports: [
    CommonModule,
    InitializeRoutingModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ]
})
export class InitializeModule { }
