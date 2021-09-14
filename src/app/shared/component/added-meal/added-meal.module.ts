import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import{AddedMealComponent} from "./added-meal.component";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AddedMealComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule
  ],
  exports:[AddedMealComponent]
})
export class AddedMealModule { }
