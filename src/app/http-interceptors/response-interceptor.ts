import { Injectable } from '@angular/core';
import {
	HttpEvent, 
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { ResponseStatus } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
	constructor(
		private router: Router,
		private userService: UserService,
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.pipe(
				map((event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						console.log("Received response: ", event);
					}

					return event;
				}),
				catchError((error: HttpErrorResponse) => {
					/**
					 * Session is invalid.
					 */
					if (error.status === 401) {
						console.log("oops, logout");
						this.userService.logout();
						void this.router.navigate(['/login']);

						return throwError(ResponseStatus.LOGOUT);
					}

					return throwError(ResponseStatus.ERROR);
				})
			);
	}
}