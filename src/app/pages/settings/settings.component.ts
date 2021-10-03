import { Component, OnInit } from '@angular/core';
import {GoogleSignInService} from '../../shared/services/google-sign-in.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../shared/services/storage.service';
import {IPersonal} from '../../shared/models/interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public form!: FormGroup;
  public form2!: FormGroup;

  private kcalFormula: number = 0;
  private userID: number = this.storage.get('ID');
  private personalInfo: IPersonal = this.storage.get(`Personal data of user-${this.userID}`);

  constructor(
    private signInService: GoogleSignInService,
    private storage: StorageService
  ) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      gender: new FormControl(this.personalInfo.gender, Validators.required),
      weight: new FormControl(this.personalInfo.weight, [ Validators.required , Validators.minLength(2), Validators.maxLength(3)]),
      height: new FormControl(this.personalInfo.height, [ Validators.required , Validators.minLength(2), Validators.maxLength(3)]),
    });
    this.form2 = new FormGroup({
      min: new FormControl(this.personalInfo.min, Validators.required),
      max: new FormControl(this.personalInfo.max, Validators.required),
      fats: new FormControl(this.personalInfo.fats, Validators.required),
      proteins: new FormControl(this.personalInfo.proteins, Validators.required),
      carbohydrates: new FormControl(this.personalInfo.carbohydrates, Validators.required)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public signOut(): void {
    this.signInService.signOut();
  }

  public calculateKcal(place: HTMLLabelElement): void {
    const calcValue = {...this.form.value};
    const weight = calcValue.weight;
    const height = calcValue.height;
    const age = 30;
    let gender = 0;
    switch (calcValue.gender) {
      case 'male':
        gender = 5;
        break;
      case 'female':
        gender = Math.sign(-161);
        break;
      default:
        console.log('error with gender calculating');
    }
    this.kcalFormula = (+weight * 10) + (+height * 6.25) + (age * 5) + gender;
    place.innerHTML = ` Ваша норма калорий в день составляет: ${this.kcalFormula} kcal`;
  }

  public submit(data: HTMLLabelElement): void {
    this.personalInfo =  Object.assign(this.form.value, this.form2.value);
    if (this.kcalFormula) {
      this.personalInfo.norma = this.kcalFormula;
    }
    this.storage.set(`Personal data of user-${this.userID}`, this.personalInfo);
    data.innerHTML = 'Данные успешно внесены';
  }
}
