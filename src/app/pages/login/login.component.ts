import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GoogleSignInService} from '../../shared/services/google-sign-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user!: gapi.auth2.GoogleUser;
  constructor(
    private signInService: GoogleSignInService,
    private ref: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.signInService.observable().subscribe(user => {
      this.user = user;
      this.ref.detectChanges();
    });
  }

  public signIn(): void {
    this.signInService.signin();
  }

  public signOut(): void {
    this.signInService.signOut();
  }
}
