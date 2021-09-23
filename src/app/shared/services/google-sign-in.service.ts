import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  private auth2!: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '980114334229-pn80tdgibmf1rsffin5veptn4d08d1pq.apps.googleusercontent.com'
      });
    });
  }
  public signin(): void {
    this.auth2.signIn({
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }).then(user => {
      this.subject.next(user);
    }).catch(() => {
      // @ts-ignore
      this.subject.next(null);
    });
  }

  public signOut(): void {
    this.auth2.signOut().then(() => {
      // @ts-ignore
      this.subject.next(null);
    }).catch(() => {});
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
}
