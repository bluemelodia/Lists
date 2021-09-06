import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Endpoint } from "../constants/urls.constants";
import { Settings } from "../interfaces/settings.interface";
import { Response, ResponseStatus } from '../types/response.types';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	private baseURL = Endpoint.TODO;
	private saveSettingsURL = `${this.baseURL}/saveSettings`;
	private loadSettingsURL = `${this.baseURL}/loadSettings`;

	private headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private http: HttpClient) { }

	public fetchSettings(): Observable<any> {
		return this.http.get<Response>(
			this.loadSettingsURL
		)
			.pipe(
				map((response: Response) => {
					console.info("🛠 ✅ SettingsService ---> fetchSettings, received settings: ", response);
					return response.responseData;
				}),
				catchError(() => {
					return of(null);
				})
			);
	}

	public saveSettings(settings: Settings): Observable<ResponseStatus> {
		console.info("🛠 ✅ SettingsService ---> fetchSettings, saveSettings: ", settings);
		return this.http.post<Response>(
			this.saveSettingsURL,
			settings,
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
				}),
				catchError(() => {
					return of(null);
				})
			);
	}
}