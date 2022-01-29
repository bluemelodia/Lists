import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) { }

	canActivate(): boolean | UrlTree {
		if (this.userService.getUser()) {
			return true;
		}

		/* Redirect to the login page. */
		return this.router.parseUrl('/login');
	}
}