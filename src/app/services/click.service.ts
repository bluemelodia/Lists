import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickService {
  clicked: Subject<HTMLElement> = new Subject<HTMLElement>();

  constructor() { }
}
