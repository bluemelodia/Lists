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
import { idleTimeout, sessionTimeout, sessionTimeoutWarning } from "../constants/session.constants";

@Injectable({
	providedIn: "root"
})
export class UserService implements OnDestroy {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	private idleTimer;
	private sessionStart;
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
			}
		)
			.pipe(
				map((response: Response) => {
					const responseCode = !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
					if (responseCode === ResponseStatus.SUCCESS) {
						this.startSession(user.username);
					}

					return responseCode;
				}),
				catchError(() => {
					return of(ResponseStatus.ERROR);
				})
			);
	}

	public getUser(): string {
		return sessionStorage.getItem(this.userKey);
	}

	private startSession(username: string): void {
		this.saveUser(username);
		this.startIdleTimer();
		this.startSessionTimers();
	}

	private saveUser(username: string): void {
		sessionStorage.setItem(this.userKey, username);
	}

	private startIdleTimer(): void {
		this.idleTimer = setTimeout(this.sessionTimeout, idleTimeout);
	}

	private startSessionTimers(): void {
		this.sessionStart = new Date();
		this.sessionTimer = setTimeout(this.sessionTimeout, sessionTimeout);
		this.sessionWarningTimer = setTimeout(this.sessionTimeoutWarning, sessionTimeoutWarning);
	}

	private endSession(): void {
		this.clearUser();
		this.clearIdleTimer();
		this.clearSessionTimers();
	}

	private clearUser(): void {
		sessionStorage.removeItem(this.userKey);
	}

	private clearIdleTimer(): void {
		clearTimeout(this.idleTimer);
	}

	private clearSessionTimers(): void {
		clearTimeout(this.idleTimer);
		clearTimeout(this.sessionTimer);
		clearTimeout(this.sessionWarningTimer);
	}

	public resetIdleTimer(): void {
		console.log("===> [User Service] Extend idle timer");
		this.clearIdleTimer();
		this.startIdleTimer();
	}

	private sessionTimeoutWarning(): void {
		this.dialogService.showConfirmDialog(ConfirmDialogAction.LogoutWarning, DialogPage.LogoutWarning)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe(() => {
				this.logout();
			});
	}

	public sessionTimeout(): void {
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