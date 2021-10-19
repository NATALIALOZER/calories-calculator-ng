import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IEvent, IUser} from '../models/interfaces';
import {RefreshService} from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  public urlApi = 'http://localhost:3000/';
  private date = new Date(Date.now() + (3600 * 1000 * 24))
  constructor(public http: HttpClient, public rs: RefreshService) {
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(this.urlApi + 'users/');
  }

  public getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(this.urlApi + 'users/' + id);
  }

  public getKey(id: string, key: string): Observable<any> {
    return this.http.get<any>(this.urlApi + 'users/' + id).pipe(
      delay(1000),
      map((data) => data[key]),
      catchError((err) => {
          console.error(err);
          throw err;
        })
    );
  }

  public setGoogleUser(userId: string, token: string, exp: Date): Observable<any> {
    let newUser = {
      "id": userId,
      "token": token,
      "token_exp": exp,
      "data": [
        {}
      ],
      "personal_settings": {},
      "username": "",
      "email": "",
      "password": ""
    };
    console.log('User was added by Google account');
    return this.http.post(this.urlApi + 'users', JSON.stringify(newUser), { 'headers': { 'content-type': 'application/json'}});
  }

  public setNewUser(userName: string, userPassword: string, userEmail: string, exp: Date = this.date): Observable<any> {
    let newUser = {
      "id": userName,
      "token": userName,
      "token_exp": exp,
      "data": [
        {}
      ],
      "personal_settings": {},
      "username": userName,
      "email": userEmail,
      "password": userPassword
    };
    console.log('New user created account');
    return this.http.post(this.urlApi + 'users', JSON.stringify(newUser), { 'headers': { 'content-type': 'application/json'}});
  }



  public updateUser(userId: string, token: string, exp: Date): Observable<any> {
    console.log('User sign in and exist');
    return this.http.patch(this.urlApi + 'users/' + userId, JSON.stringify({
      "token": token,
      "token_exp": exp
    }), {'headers': { 'content-type': 'application/json'}});
  }

  public updatePersonalUserData(userId: string, data: any): any {
    return this.http.patch(this.urlApi + 'users/' + userId, JSON.stringify({'personal_settings': data}), {'headers': { 'content-type': 'application/json'}});
  }

  public updateUserEvents(userId: string, data: any): any {
    return this.http.patch(this.urlApi + 'users/' + userId, JSON.stringify({'data': data}), { 'headers': { 'content-type': 'application/json'}});
  }

  public getEvents(userID: string): Observable<IUser> {
    return this.http.get<IUser>(this.urlApi + 'users/' + userID).pipe(

    );
  };
}
