import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Endpoint } from "../../../constants/urls.constants";
import { Response, ResponseStatus } from "../../../interfaces/response.interface";
import { Settings } from "../interfaces/settings.interface";

@Injectable({
	providedIn: "root"
})
export class SettingsService {
	private baseURL = Endpoint.SETTINGS;
	private saveSettingsURL = `${this.baseURL}/saveSettings`;
	private loadSettingsURL = `${this.baseURL}/loadSettings`;

	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private http: HttpClient,
	) { }

	public loadSettings(userID = "guest"): Observable<Settings> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.get<Response>(
			`${this.loadSettingsURL}/${userID}`
		)
			.pipe(
				map((response: Response) => {
					console.info("[Settings Service] Fetch settings: ", response);

					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					const settings: Settings = response.responseData?.length > 0 ? response.responseData[0] : null;
					if (settings && settings["preferences"]) {
						settings.tasks = settings["preferences"];
					}
					return settings;
				}),
				catchError(() => {
					return of(null);
				})
			);
	}

	public saveSettings(settings: Settings): Observable<ResponseStatus> {
		console.info("[Settings Service] Save settings: ", settings);
		return this.http.post<Response>(
			this.saveSettingsURL,
			this.formatSettings(settings),
			{
				headers: this.headers
			}
		)
			.pipe(
				map(() => {
					return ResponseStatus.SUCCESS;
				}),
				catchError(() => {
					return of(ResponseStatus.ERROR);
				})
			);
	}

	private formatSettings(settings: Settings): Settings {
		return {
			id: "guest",
			...settings,
		}
	}
}