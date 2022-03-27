import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private userService: UserService
	) { }

	public canActivate(): boolean {
		console.log("===> [Auth Guard] Can activate route: ", this.userService.getUser());
		if (this.userService.getUser()) {
			return true;
		}

		/* Redirect to the login page. */
		this.userService.logout();

		return false;
	}

	private getResolvedUrl(route: ActivatedRouteSnapshot): string {
		return route.pathFromRoot
			.map(path => path.url.map(segment => segment.toString()).join('/'))
			.join('/');
	}

}