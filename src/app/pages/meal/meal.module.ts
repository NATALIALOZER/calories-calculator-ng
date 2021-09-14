import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealComponent } from './meal.component';
import {MealRoutingModule} from "./meal-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ImageUploadModule} from "../../shared/component/image-upload/image-upload.module";



@NgModule({
  declarations: [
    MealComponent
  ],
    imports: [
        CommonModule,
        MealRoutingModule,
        MatButtonModule,
        MatInputModule,
        ImageUploadModule
    ]
})
export class MealModule { }
