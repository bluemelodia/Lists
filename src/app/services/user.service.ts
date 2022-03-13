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

@Injectable({
	providedIn: "root"
})
export class UserService implements OnDestroy {
	private headers = new HttpHeaders().set("Content-Type", "application/json");
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
						this.saveUser(user.username);
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

	private saveUser(username: string): void {
		sessionStorage.setItem(this.userKey, username);
	}

	private clearUser(): void {
		sessionStorage.removeItem(this.userKey);
	}

	public sessionTimeout(): void {
		console.log("===> show session dialog");
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Logout, DialogPage.Logout)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe(() => {
				console.log("===> user clicked, log the user out");
				this.logout();
			});
	}

	public logout(): void {
		this.clearUser();

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