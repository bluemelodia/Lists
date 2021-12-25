import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, } from "rxjs";
import { catchError, map } from "rxjs/operators";

import {
	Recipient,
	RecipientAction,
	RecipientList,
} from "../interfaces/event/recipient.interface";
import { Calendar, CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
import { AddRecipient } from "../interfaces/service/service-objects.interface";
import { RecipientUtils } from "../utils/recipient.utils";

// services
import { CalendarService } from "./calendar.service";

@Injectable({
	providedIn: "root"
})
export class RecipientService {
	private calendar: Calendar;
	/** cache the recipient response, as it's used by multiple components */
	private birthdays: RecipientList;
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private calendarService: CalendarService,
		private http: HttpClient
	) {
		this.setupSubscriptions();
	}

	private setupSubscriptions() {
		this.calendarService.onCalendarFetched$
			.subscribe((calendar: Calendar) => {
				if (!calendar) {
					throw new Error('Unable to fetch calendar.');
				}

				this.calendar = calendar;
			});
	}

	public modifyRecipient(recipient: Recipient, action: RecipientAction): Observable<ResponseStatus> {
		switch (action) {
			case RecipientAction.Add:
				return this.postRecipient(recipient);
			case RecipientAction.Edit:
				return this.postRecipient(recipient, RecipientAction.Edit);
		}
	}

	/*
	* TODO: add user ID
	*/
	public postRecipient(recipient: Recipient, action = RecipientAction.Add): Observable<ResponseStatus> {
		console.info("[Recipient Service] Post or edit recipient: ", recipient);

		return this.http.post<Response>(
			RecipientUtils.recipientURLForAction(action),
			RecipientUtils.formatRecipient(recipient),
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
			)
	}

	private patchRecipient(recipient: AddRecipient) {
		this.http.post<Response>(
			RecipientUtils.recipientURLForAction(RecipientAction.Edit),
			recipient,
			{
				headers: this.headers
			}
		)
			.subscribe();
	}

	public deleteRecipient(uuid: string): Observable<ResponseStatus> {
		console.info("[Recipient Service] Delete recipient with uuid: ", uuid);

		return this.http.delete<Response>(
			`${RecipientUtils.recipientURLForAction(RecipientAction.Delete)}/guest/${uuid}`,
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

	/**
	 * @param userID 
	 * @returns A sorted list of birthdays for this user.
	 */
	public getRecipients(userID = "guest"): Observable<AddRecipient[]> {
		console.info("[Recipient Service] Get recipients for id: ", userID);

		const getBirthday = `${RecipientUtils.recipientURLForAction(RecipientAction.Fetch)}/${userID}`;

		return this.http.get<Response>(
			getBirthday
		)
			.pipe(
				map((response: Response) => {
					console.info("[Recipient Service] Received birthdays: ", response);
					this.birthdays = RecipientUtils.createRecipientLists(response.responseData);
					this.addSolarBirthdays(this.birthdays);
					return this.birthdays;
				}),
				catchError(() => {
					return of(null);
				})
			);
	}

	public addSolarBirthdays(birthdays: RecipientList): void {
		birthdays?.lunar?.forEach((recipient: AddRecipient) => {
			if (!recipient.futureDates || typeof recipient.futureDates !== 'object') {
				recipient.futureDates = {};
			}

			const matchingDays = this.calendar?.days?.filter((day: CalendarDay) => {
				return day.cmonthname === recipient.date.cmonthname
					&& day.cdate === recipient.date.cdate;
			});

			let changes = true;
			matchingDays?.forEach((day: CalendarDay) => {
				if (day.year < this.calendarService.year) {
					delete recipient.futureDates[day.year];
					changes = true;
				} else if (!recipient.futureDates[day.year]) {
					recipient.futureDates[day.year] = day;
					changes = true;
				}
			});

			/** Silently propagate changes to the server. */
			if (changes) {
				console.info("[Recipient Service] Send changes to server: ", recipient);
				this.patchRecipient(recipient);
			}
		});
	}
}
