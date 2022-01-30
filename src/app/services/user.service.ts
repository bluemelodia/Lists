import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, ReplaySubject } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Response, ResponseStatus } from "../interfaces/response.interface";
import { User, UserAction } from "../interfaces/user.interface";
import { UserUtils } from "../utils/user.utils";

@Injectable({
	providedIn: "root"
})
export class UserService {
	private headers = new HttpHeaders().set("Content-Type", "application/json");
	private userKey = "user";

	private _user$ = new ReplaySubject<boolean>();
	public user$ = this._user$.asObservable();

	constructor(
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
		this._user$.next(true);
	}

	private clearUser(): void {
		sessionStorage.removeItem(this.userKey);
		this._user$.next(false);
	}

	public logout(): void {
		console.log("===> [User Service] Logout");
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
}