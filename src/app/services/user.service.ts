import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Response, ResponseStatus } from "../interfaces/response.interface";
import { User, UserAction } from "../interfaces/user.interface";
import { UserUtils } from "../utils/user.utils";

@Injectable({
	providedIn: "root"
})
export class UserService {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private http: HttpClient,
	) { }

	public createUser(user: User): Observable<ResponseStatus> {
		console.info("[User Service] Create user: ", user);

		return this.http.post<Response>(
			UserUtils.userURLForAction(UserAction.Register),
			user,
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					console.log("===> [User Service] response: ", response);
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
				}),
				catchError((error) => {
					console.log("===> [User Service] error: ", error);
					return of(ResponseStatus.ERROR);
				})
			);
	}
}