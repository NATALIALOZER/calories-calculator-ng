import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {GoogleSignInService} from "./google-sign-in.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'google-signin'
  // @ts-ignore
  user: gapi.auth2.GoogleUser;
  constructor( private signInService: GoogleSignInService,private ref: ChangeDetectorRef) { }



  ngOnInit(): void {
    this.signInService.observable().subscribe(user=>{
      this.user=user
      this.ref.detectChanges()
    })
  }

  signIn(){
    this.signInService.signin()
  }

  signOut(){
    this.signInService.signOut()
  }


}
