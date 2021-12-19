import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Endpoint } from "../../../constants/urls.constants";
import { Dialog, DialogAction, DialogPage } from "../../../interfaces/dialog.interface";
import { Response, ResponseStatus } from "../../../interfaces/response.interface";
import { Settings } from "../interfaces/settings.interface";

import { DialogService } from "../../../services/dialog.service";

@Injectable({
	providedIn: "root"
})
export class SettingsService {
	private baseURL = Endpoint.SETTINGS;
	private saveSettingsURL = `${this.baseURL}/saveSettings`;
	private loadSettingsURL = `${this.baseURL}/loadSettings`;

	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private dialogService: DialogService,
		private http: HttpClient,
	) { }

	public loadSettings(userID = "guest"): Observable<Settings> {
		console.info("🛠 ✅ SettingsService ---> loadSettings: ");
		return this.http.get<Response>(
			`${this.loadSettingsURL}/${userID}`
		)
			.pipe(
				map((response: Response) => {
					console.info("🛠 ✅ SettingsService ---> fetchSettings, received settings: ", response);
					const settings = response.responseData?.length > 0 ? response.responseData[0] : null;
					if (settings?.preferences) {
						settings.tasks = JSON.parse(settings.preferences);
					}
					return settings;
				}),
				catchError(() => {
					return of(null);
				})
			);
	}

	public saveSettings(settings: Settings): Observable<void> {
		console.info("🛠 ✅ SettingsService ---> fsaveSettings: ", settings);
		return this.http.post<Response>(
			this.saveSettingsURL,
			this.formatSettings(settings),
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					this.dialogService.showResponseStatusDialog(response.statusCode, DialogAction.Save, DialogPage.Settings);
					return of(null);
				}),
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Save, DialogPage.Settings);
					return of(null);
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