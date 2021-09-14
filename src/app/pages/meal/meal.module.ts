import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealComponent } from './meal.component';
import {MealRoutingModule} from "./meal-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ImageUploadModule} from "../../shared/component/image-upload/image-upload.module";
import {AddedMealModule} from "../../shared/component/added-meal/added-meal.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    MealComponent
  ],
    imports: [
        CommonModule,
        MealRoutingModule,
        MatButtonModule,
        MatInputModule,
        ImageUploadModule,
        AddedMealModule,
        FormsModule
    ]
})
export class MealModule { }
