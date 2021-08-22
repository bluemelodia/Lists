import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Topic } from '../constants/topics.constants';
import { IMenuDetails } from '../modules/nav/constants/nav.constants';
import { NavUtils } from '../modules/nav/utils/nav.utils';

@Injectable({
	providedIn: 'root'
})
export class NavService {
	private menuState$ = new Subject<boolean>();
	private menuTitleChanged$ = new Subject<string>();

	constructor(private router: Router) {}

	public get onMenuChange$(): Observable<boolean> {
		return this.menuState$.asObservable();
	}

	public get onMenuTitleChange$(): Observable<string> {
		return this.menuTitleChanged$.asObservable();
	}

	public setTitle(title: string) {
		this.menuTitleChanged$.next(title);
	}


	public navigateToTopic(topic: Topic, additionalParams?: Params) {
		const destinationTopic: IMenuDetails = NavUtils.getTopic(topic);
		this.navigate(destinationTopic.route, destinationTopic.title, additionalParams);
	}

	/**
	* Convenience method for navigating the user from page to page.
	*/
	public navigate(route: string, title: string, additionalParams?: Params) {
		console.info(`🚀 ✅ NavService ---> navigate, route to ${route} with title ${title}.`);
		this.router.navigate([route],{ queryParams: { title: title, ...additionalParams }});
	}

	/**
	 * Other consumers can call this to close the menu.
	 */
	closeNavMenu() {
		this.menuState$.next(false);
	}
}
