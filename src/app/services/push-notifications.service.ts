import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Endpoint } from "../constants/urls.constants";

@Injectable({
	providedIn: 'root'
})
export class PushNotificationsService {
	private baseURL = Endpoint.TODO;
	private pushSubscriptionURL = `${this.baseURL}/push`;
	private saveSubscriptionURL = `${this.baseURL}/`;

	private headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(
		private http: HttpClient,
	) { }

	public addPushSubscriber(sub: PushSubscription): Observable<void> {
		return this.http.post<Response>(
			`${this.pushSubscriptionURL}`,
			sub,
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					console.log("===> response from db: ", response);
					return of(null);
				}),
				catchError(() => {
					return of(null);
				})
			);
	}
}