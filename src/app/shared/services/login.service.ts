import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";
import {JsonService} from "./json.service";
import {Observable, ReplaySubject} from "rxjs";
import {IUser} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private subject = new ReplaySubject<IUser>()

  constructor(
    private zone: NgZone,
    private router: Router,
    public storage: StorageService,
    public db: JsonService
  ) { }

  public SignIn(data:any): void{
    this.db.getAllUsers().subscribe(res => {
      let persons = []
      for(let user in res){
        this.subject.next(res[user]);
        let person = {
          name: '',
          password: '',
          email: ''
        }
        person.name = res[user]["username"]
        person.password = res[user]["password"]
        person.email = res[user]["email"]
        persons.push(person)
      }
      for(let p in persons){
        if(data.value["userData"]["username"]===persons[p].name&&data.value["userData"]["password"]===persons[p].password){
          console.log("Existed user sign in")
          this.storage.set('ID', data.value["userData"]["username"]);
          this.zone.run(() => {
            this.router.navigate(['schedule']);
          });
        }
      }
    },
    error => {
      console.log("Problem with getting users from the database. Error: " + error)
    })
  }

  public createAccount(data:any){
    console.log(data)
    this.db.getUser(data.value["userData"]["username"]).subscribe(
      (el: any) => {
        console.log(`User ${el} already exist`)
      },
      (err: Error) => {
        console.log("New user created account")
        this.db.setNewUser(data.value["userData"]["username"],data.value["userData"]["password"],data.value["userData"]["email"]).subscribe()
        this.SignIn(data)
      }
    );
  }

  public observable(): Observable<IUser> {
    return this.subject.asObservable();
  }
}
