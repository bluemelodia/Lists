import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { DialogService } from "./dialog.service";
import { Meeting, MeetingAction } from "../interfaces/meeting.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
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
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, MeetingUtils.meetingDialogForAction(action));
					return of(null);
				})
			);
	}
}