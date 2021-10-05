import {Injectable, NgZone} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Router} from '@angular/router';
import {StorageService} from './storage.service';
import {JsonService} from "./json.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {
  private auth2!: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  private token: string = '';
  private id!: string;
  private users: any;

  constructor(
    private zone: NgZone,
    private router: Router,
    public storage: StorageService,
    public db: JsonService
  ) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2
        .init({
          client_id: '980114334229-pn80tdgibmf1rsffin5veptn4d08d1pq.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
        });
    });
  }

  public refreshPeople(): void {
    this.db.get()
      .subscribe((data: any) => {
        this.users = data;
      });
  }

  public signIn(): void {
    this.auth2.signIn()
      .then(user => {
        this.subject.next(user);
        this.id = user.getId();
        //this.storage.set('ID', this.id);
        this.token = user.getAuthResponse().id_token;
        //this.storage.set('Token', this.token);
        const expDate = new Date(new Date().getTime() + +user.getAuthResponse().expires_in * 1000);
        //this.storage.set('Token_exp', expDate);
        this.db.setUser(this.id, this.token, expDate).subscribe(data => {
          console.log(data);
          this.refreshPeople();
        });

        this.zone.run(() => {
          this.router.navigate(['schedule']);
        });
      }).catch(err => err);
  }

  public signOut(): void {
    this.auth2.signOut()
      .then(() => {
        this.subject.next(undefined);
        /*this.storage.remove('ID');
        this.storage.remove('Token');
        this.storage.remove('Token_exp');*/

        this.zone.run(() => {
          this.router.navigate(['login']);
        });
      });
  }

  get getToken(): string | null {
    //const expDate = new Date(this.storage.get('Token_exp'));
    const expDate = new Date(this.db.getKey(this.id, 'Token_exp'));
    if (new Date() > expDate) {
      this.signOut();
      return null;
    }
    //return this.storage.get('Token');
    return this.db.getKey(this.id, 'Token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken;
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }

}
