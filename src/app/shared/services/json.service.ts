import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  public urlApi = 'http://localhost:3000/';
  constructor(public http: HttpClient) {
  }

  public get(): any {
    return this.http.get<any>(this.urlApi);
  }

  public getUser(id: any): any {
    return this.http.get<any>(this.urlApi + 'users/' + id);
  }

  public getKey(id: any, key: any): any  {
    return this.http.get<any>(this.urlApi + 'users/' + id).pipe(
      map((data) => {
        return data[key];
      }),
      catchError((err) => {
          console.error(err);
          throw err;
        }
      ));
  }

  public setUser(userId: any,token: any, exp: any): Observable<any> {
    const newUser = {
      "id": userId,
      "token": token,
      "token_exp": exp
    };
    console.log('user no exist')
    const body = JSON.stringify(newUser);
    return this.http.post(this.urlApi + 'users', JSON.stringify(newUser), {'headers': { 'content-type': 'application/json'}});
  }

  public updateUser(userId: any,token: any, exp: any): Observable<any>{
    const existUser = {
      "id": userId,
      "token": token,
      "token_exp": exp
    };
    console.log('user exist')
    const body = JSON.stringify(existUser);
    return this.http.put(this.urlApi + 'users/' + userId, body, {'headers':{ 'content-type': 'application/json'}});
  }
}


