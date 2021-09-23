import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  public refresh: Subject<any> = new Subject();
}
