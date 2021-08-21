import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NavService {
	private menuState$ = new Subject<boolean>();
	private menuTitleChanged$ = new Subject<string>();

	public get onMenuChange$(): Observable<boolean> {
		return this.menuState$.asObservable();
	}

	public get onMenuTitleChange$(): Observable<string> {
		return this.menuTitleChanged$.asObservable();
	}

	public setTitle(title: string) {
		this.menuTitleChanged$.next(title);
	}

	/**
	 * Other consumers can call this to close the menu.
	 */
	closeNavMenu() {
		this.menuState$.next(false);
	}
}
