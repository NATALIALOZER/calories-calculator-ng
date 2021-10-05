import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  public urlApi = 'http://localhost:3000/';
  private userexist: boolean = false;
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
    let req;
    this.getUser(userId).subscribe(
        (data: any) => {
        this.userexist = true;
        const royal = JSON.parse(data);
        royal['token'] = token;
        royal['token_exp'] = exp;
        const body = JSON.stringify(royal);
        req = this.http.put(this.urlApi + 'users/' + userId, body, {'headers':{ 'content-type': 'application/json'}});
      },
        (error: any) => {
        console.log('Error', error);
      }
    );
    if (this.userexist === false) {
      const newUser = {
        "id": userId,
        "token": token,
        "token_exp": exp
      };
      const body = JSON.stringify(newUser);
      req = this.http.post(this.urlApi + 'users', body, {'headers': { 'content-type': 'application/json'}});
    }
    // @ts-ignore
    return req;
  }
}

//resolve problem with CORS!
