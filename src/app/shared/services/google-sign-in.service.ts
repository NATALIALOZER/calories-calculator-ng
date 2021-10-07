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

  public signIn(): void {
    this.auth2.signIn()
      .then(user => {
        this.subject.next(user);
        this.id = user.getId();
        this.storage.set('ID', this.id);
        this.token = user.getAuthResponse().id_token;
        //this.storage.set('Token', this.token);
        const expDate = new Date(new Date().getTime() + +user.getAuthResponse().expires_in * 1000);
        //this.storage.set('Token_exp', expDate);
        this.db.getUser(this.id).subscribe(
          (el: any) => {
            console.log("Value Received :" + el.id);
            this.db.updateUser(this.id, this.token, expDate).subscribe(data => {
            });
          },
          (err:any) => {
            console.log("Error caught at Subscriber :" + err);
            this.db.setUser(this.id, this.token, expDate).subscribe();
          }
        )

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

  /*get getToken(): string | null {
    const expDate = new Date(this.storage.get('Token_exp'));
    if (new Date() > expDate) {
      this.signOut();
      return null;
    }return this.storage.get('Token');
  }*/

  get getToken(): any {
    this.db.getKey(this.id, 'Token_exp')
      .subscribe(
        (date) => {
          let expDate: Date = new Date(date);
          if (new Date() > expDate) {
            this.signOut();
          }
        },
        (err)=>console.log(err),
      )
    return this.db.getKey(this.id, 'Token').subscribe(
      (res) => res ,
      (err)=> console.log(err),
    )
  }

  public isAuthenticated(): boolean {
    return !!this.getToken;
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }

}
