import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Meeting, MeetingAction } from "../interfaces/event/meeting.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
import { AddMeeting } from "../interfaces/service/service-objects.interface";
import { UserService } from "./user.service";
import { MeetingUtils } from "../utils/meeting.utils";

@Injectable({
	providedIn: "root"
})
export class MeetingService {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) {}

	public modifyMeeting(meeting: Meeting, action: MeetingAction): Observable<ResponseStatus> {
		return this.postMeeting(meeting, action);
	}

	private postMeeting(meeting: Meeting, action: MeetingAction): Observable<ResponseStatus> {
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
					return of(ResponseStatus.ERROR);
				})
			);
	}

	/**
	* @param userID 
	* @returns A sorted list of meetings for this user.
	*/
	public getMeetings(): Observable<AddMeeting[]> {	
		const userID = this.userService.getUser();
		const getMeeting = `${MeetingUtils.meetingURLForAction(MeetingAction.Fetch)}/${userID}`;
		
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.get<Response>(
			getMeeting
		)
			.pipe(
				map((response: Response) => {
					return MeetingUtils.processMeetings(response.responseData);
				}),
				catchError(() => {
					return of(null);
				})
			);
	}

	public deleteMeeting(uuid: string): Observable<ResponseStatus> {
		const userID = this.userService.getUser();

		return this.http.delete<Response>(
			`${MeetingUtils.meetingURLForAction(MeetingAction.Delete)}/${userID}/${uuid}`,
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
			)
	}
}