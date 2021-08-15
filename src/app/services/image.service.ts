import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NavService {
	private menuState$ = new Subject<boolean>();

	constructor(private router: Router) { }

	public processFile(input) {
 
    }
}




