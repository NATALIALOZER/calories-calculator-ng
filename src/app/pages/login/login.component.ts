import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GoogleSignInService} from '../../shared/services/google-sign-in.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../shared/services/login.service';
import {IUser} from '../../shared/models/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public signupForm!: FormGroup;
  public createAccountForm!: FormGroup;
  public createAccount: boolean = false;
  public user!: gapi.auth2.GoogleUser | IUser;

  constructor(
    private login: LoginService,
    private signInService: GoogleSignInService,
    private ref: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username':new FormControl('',[Validators.required]),
        'password':new FormControl('',[Validators.required]),
        'email':new FormControl('',[Validators.required,Validators.email]),
      })
    });
    this.signupForm.setValue({
      'userData':{
        'username':'John2',
        'password':'123457',
        'email':'jonh2@gmail.com'
      }
    })
    this.createAccountForm = new FormGroup({
      'userData': new FormGroup({
        'username':new FormControl('',[Validators.required]),
        'password':new FormControl('',[Validators.required]),
        'email':new FormControl('',[Validators.required,Validators.email]),
      })
    });
    this.createAccountForm.setValue({
      'userData':{
        'username':'John2',
        'password':'123457',
        'email':'jonh2@gmail.com'
      }
    });
    this.signInService.observable().subscribe(user => {
      this.user = user;
      this.ref.detectChanges();
    });
    this.login.observable().subscribe(user => {
      this.user = user;
      this.ref.detectChanges();
    });
  }

  public signIn(): void {
    this.login.SignIn(this.signupForm);
  }

  public create(): void {
    this.createAccount = !this.createAccount;
  }

  public onSubmit(): void {
    this.login.createAccount(this.createAccountForm);
  }


  public signInGoogle(): void {
    this.signInService.signIn();
  }
}
