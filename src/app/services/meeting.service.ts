import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { DialogService } from "./dialog.service";
import { Meeting, MeetingAction } from "../interfaces/meeting.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
import { MeetingUtils } from "../utils/meeting.utils";
import { AddMeeting } from "../interfaces/service/service-objects.interface";

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
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, MeetingUtils.meetingDialogForAction(action));
					return of(null);
				})
			);
	}

	/**
	* @param userID 
	* @returns A sorted list of birthdays for this user.
	*/
	public getMeetings(userID = "guest"): Observable<AddMeeting[]> {
		console.info("🍰 🏁 MeetingService ---> getMeetings, for id: ", userID);
	
		const getMeeting = `${MeetingUtils.meetingURLForAction(MeetingAction.Fetch)}/${userID}`;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.get<Response>(
			getMeeting
		)
			.pipe(
				map((response: Response) => {
					console.info("🍰 ✅ BirthdayService ---> getBirthdays, received birthdays: ", response);
					//return BirthdayUtils.processBirthdays(response.responseData);
				}),
				catchError(() => {
					return of(null);
				})
			);
		}
}