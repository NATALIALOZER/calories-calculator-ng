import {Injectable, NgZone} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {
  private auth2!: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor(
    private zone: NgZone,
    private router: Router,
    public storage: StorageService
  ) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2
        .init({
          client_id: '980114334229-pn80tdgibmf1rsffin5veptn4d08d1pq.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
        });
    });
  }

  public signIn(): void {
    this.auth2.signIn()
      .then(user => {
        this.subject.next(user);
        const token = user.getAuthResponse().id_token;
        this.storage.set('Token', token);
        const id = user.getId();
        this.storage.set('ID', id);
        this.zone.run(() => {
          this.router.navigate(['schedule']);
        });
      }).catch(err => err);
  }

  public signOut(): void {
    this.auth2.signOut()
      .then(() => {
        this.subject.next(undefined);
        this.storage.remove('ID');
        this.storage.remove('Token');
        this.zone.run(() => {
          this.router.navigate(['login']);
        });
      });
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
}
