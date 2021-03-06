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
		private userService: UserService,
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.pipe(
				map((event: HttpEvent<any>) => {
					this.userService.resetIdleTimer();
					return event;
				}),
				catchError((error: HttpErrorResponse) => {
					/**
					 * Session is invalid.
					 */
					if (error.status === 401) {
						console.log("[Response Interceptor] Invalid session, logout.");
						this.userService.sessionTimeout();

						return throwError(ResponseStatus.LOGOUT);
					}

					return throwError(ResponseStatus.ERROR);
				})
			);
	}
}