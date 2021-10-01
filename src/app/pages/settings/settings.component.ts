import { Component, OnInit } from '@angular/core';
import {GoogleSignInService} from "../../shared/services/google-sign-in.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  form!: FormGroup;
  form2!: FormGroup;
  private min: number = 0;

  constructor(private signInService: GoogleSignInService,private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      gender: new FormControl('', Validators.required),
      weight: new FormControl('', [ Validators.required , Validators.minLength(2), Validators.maxLength(3)]),
      height: new FormControl('', [ Validators.required , Validators.minLength(2), Validators.maxLength(3)]),
    });
    this.form2 = new FormGroup({
      min: new FormControl('', Validators.required),
      max: new FormControl('', Validators.required),
      fats: new FormControl('', Validators.required),
      proteins: new FormControl('', Validators.required),
      carbohydrates: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);

  }

  public signOut(): void {
    this.signInService.signOut();
  }

  public calculateKcal(): void {
    const calcValue = {...this.form.value}
    let weight = calcValue.weight
    let height = calcValue.height
    let age = 30;
    let gender = 0;
    switch (calcValue.gender) {
      case 'male':
        gender=5;
        break;
      case 'female':
        gender=Math.sign(-161);
        break;
      default:
        console.log("error with gender")
    }
    let kcalFormula = (+weight*10) + (+height*6.25) + (age*5) + gender;
    console.log(kcalFormula)
    this.min = kcalFormula - 200
  }
}
