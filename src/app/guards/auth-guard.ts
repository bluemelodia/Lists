import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private userService: UserService) { }

	canActivate(): boolean {
		console.log("===> [Auth Guard] Can activate route: ", this.userService.getUser())
		if (this.userService.getUser()) {
			return true;
		}

		/* Redirect to the login page. */
		this.userService.logout();

		return false;
	}
}