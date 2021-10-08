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
  constructor(public http: HttpClient, public rs: RefreshService) {
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.urlApi);
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

  public setUser(userId: string,token: string, exp: Date): Observable<any> {
    const newUser = {
      "id": userId,
      "token": token,
      "token_exp": exp,
      "data": [],
      "personal_settings": {}
    };
    console.log('Sign in new user');
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

  public getEvents(userID: string): Observable<IEvent[]> {
    return this.http.get<any>(this.urlApi + 'users/' + userID).pipe(
      map((response) => {
        let events: any[] = [];
        const data = response['data'];
        for ( const i in data) {
          data[i].start = new Date(data[i].start);
          events = [...events, data[i]];
        }
        return events;
      }),
    );
  };
}
