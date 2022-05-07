import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, Subject, } from "rxjs";
import { catchError, map, take, takeUntil } from "rxjs/operators";

import { DialogService } from "./dialog.service";

import { ConfirmDialogAction, DialogPage } from "../interfaces/dialog.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
import { User, UserAction } from "../interfaces/user.interface";
import { UserUtils } from "../utils/user.utils";
import {
	idleTimeout,
	idleTimeoutWarning,
	sessionTimeout,
	sessionTimeoutWarning,
} from "../constants/session.constants";

@Injectable({
	providedIn: "root"
})
export class UserService implements OnDestroy {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	private idleTimer;
	private idleWarningTimer;
	private sessionTimer;
	private sessionWarningTimer;

	private userKey = "user";
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
		private http: HttpClient,
		private router: Router,
	) { }

	public createUser(user: User): Observable<ResponseStatus> {
		return this.http.post<Response>(
			UserUtils.userURLForAction(UserAction.Register),
			user,
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
				}),
				catchError(() => {
					return of(ResponseStatus.ERROR);
				})
			);
	}

	public login(user: User): Observable<ResponseStatus> {
		return this.http.post<Response>(
			UserUtils.userURLForAction(UserAction.Login),
			user,
			{
				headers: this.headers
			},
		)
			.pipe(
				map((response: Response) => {
					const responseCode = !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
					if (responseCode === ResponseStatus.SUCCESS) {
						this.startSession(user.username);
					}

					return responseCode;
				}),
				catchError((error) => {
					return of(ResponseStatus.ERROR);
				})
			);
	}

	public getUser(): string {
		return sessionStorage.getItem(this.userKey);
	}

	private startSession(username: string): void {
		this.saveUser(username);
		this.startIdleTimers();
		this.startSessionTimers();
	}

	private saveUser(username: string): void {
		sessionStorage.setItem(this.userKey, username);
	}

	private startIdleTimers(): void {
		this.idleTimer = setTimeout(() => {
			this.sessionTimeout();
		}, idleTimeout);
		this.idleWarningTimer = setTimeout(() => {
			this.idleTimeoutWarning();
		}, idleTimeoutWarning);
	}

	private startSessionTimers(): void {
		this.sessionTimer = setTimeout(() => {
			this.sessionTimeout();
		}, sessionTimeout);
		this.sessionWarningTimer = setTimeout(() => {
			this.sessionTimeoutWarning()
		}, sessionTimeoutWarning);
	}

	private endSession(): void {
		this.clearUser();
		this.clearIdleTimers();
		this.clearSessionTimers();
	}

	private clearUser(): void {
		sessionStorage.removeItem(this.userKey);
	}

	private clearIdleTimers(): void {
		clearTimeout(this.idleTimer);
		clearTimeout(this.idleWarningTimer);
	}

	private clearSessionTimers(): void {
		clearTimeout(this.sessionTimer);
		clearTimeout(this.sessionWarningTimer);
	}

	public resetIdleTimer(): void {
		this.clearIdleTimers();
		if (this.getUser()) {
			this.startIdleTimers();
		}
	}

	/**
	* Don't show the idle timeout dialog if the user isn't logged in.
	*/
	private idleTimeoutWarning(): void {
		this.dialogService.hideDialog();
		this.dialogService.showConfirmDialog(ConfirmDialogAction.IdleTimeoutWarning, DialogPage.IdleTimeoutWarning)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: ConfirmDialogAction) => {
				switch (action) {
					case ConfirmDialogAction.Extend:
						this.resetIdleTimer();
						break;
					case ConfirmDialogAction.Logout:
						this.sessionTimeout();
						break;
					default:
						break;
				}
			});
	}

	/**
	* Clear idle timers once this warning is shown. There will no longer
	* be an option to extend the session. 
	*/
	private sessionTimeoutWarning(): void {
		this.dialogService.hideDialog();
		this.clearIdleTimers();

		this.dialogService.showConfirmDialog(ConfirmDialogAction.SessionTimeoutWarning, DialogPage.SessionTimeoutWarning)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe();
	}

	public sessionTimeout(): void {
		this.dialogService.hideDialog();
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Logout, DialogPage.Logout)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe(() => {
				this.logout();
			});
	}

	public logout(): void {
		this.endSession();

		this.http.post<Response>(
			UserUtils.userURLForAction(UserAction.Logout),
			{
				headers: this.headers
			}
		)
			.subscribe();

		void this.router.navigate(['/login']);
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}