import { Injectable, ModuleWithComponentFactories } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { DialogService } from "./dialog.service";
import { Meeting, MeetingAction } from "../interfaces/event/meeting.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
import { Dialog, DialogAction, DialogPage } from "../interfaces/dialog.interface";
import { AddMeeting } from "../interfaces/service/service-objects.interface";
import { MeetingUtils } from "../utils/meeting.utils";

@Injectable({
	providedIn: "root"
})
export class MeetingService {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private dialogService: DialogService,
		private http: HttpClient,
	) {}

	public modifyMeeting(meeting: Meeting, action: MeetingAction): Observable<ResponseStatus> {
		return this.postMeeting(meeting, action);
	}

	private postMeeting(meeting: Meeting, action: MeetingAction): Observable<ResponseStatus> {
		console.info("🧳 🏁 MeetingService ---> postMeeting, meeting: ", meeting);

		return this.http.post<Response>(
			MeetingUtils.meetingURLForAction(action),
			MeetingUtils.createAddMeeting(meeting),
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
				}),
				catchError(() => {
					switch(action) {
						case MeetingAction.Add:
							this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Add, DialogPage.Meeting);
							break;
						case MeetingAction.Edit:
							this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Edit, DialogPage.Meeting);
							break;
					}
					return of(null);
				})
			);
	}

	/**
	* @param userID 
	* @returns A sorted list of meetings for this user.
	*/
	public getMeetings(userID = "guest"): Observable<AddMeeting[]> {
		console.info("🧳 🏁 MeetingService ---> getMeetings, for id: ", userID);
	
		const getMeeting = `${MeetingUtils.meetingURLForAction(MeetingAction.Fetch)}/${userID}`;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.get<Response>(
			getMeeting
		)
			.pipe(
				map((response: Response) => {
					console.info("🧳 ✅ MeetingService ---> getMeetings, received birthdays: ", response);
					return MeetingUtils.processMeetings(response.responseData);
				}),
				catchError(() => {
					return of(null);
				})
			);
	}

	public deleteMeeting(uuid: string): Observable<ResponseStatus> {
		console.info("🧳 🏁 MeetingService ---> delete meeting: ", uuid);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.delete<Response>(
			`${MeetingUtils.meetingURLForAction(MeetingAction.Delete)}/guest/${uuid}`,
			{
				headers: this.headers
			}
		)
			.pipe(
				map(() => {
					console.info("🧳 🏁 MeetingService ---> deleteMeeting success");
					this.dialogService.showResponseStatusDialog(ResponseStatus.SUCCESS, DialogAction.Delete, DialogPage.Meeting);
					return ResponseStatus.SUCCESS;
				}),
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Delete, DialogPage.Meeting);
					return of(null);
				})
			)
	}
}