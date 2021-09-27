import {Injectable, NgZone} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  private auth2!: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor(
    private zone: NgZone,
    private router: Router
  ) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2
        .init({
        client_id: '980114334229-pn80tdgibmf1rsffin5veptn4d08d1pq.apps.googleusercontent.com'
      });
    });
  }

  public signIn(): void {
    this.auth2.signIn({
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
    })
      .then(user => {
        this.subject.next(user);
        this.zone.run(() => {
          this.router.navigate(['schedule']);
        });
      }).catch(err => err);
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
}
