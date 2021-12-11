import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, } from "rxjs";
import { catchError, map } from "rxjs/operators";

import {
	Birthday,
	BirthdayAction,
	BirthdayID,
	BirthdayList,
} from "../interfaces/event/birthday.interface";
import { Calendar, CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { Dialog } from "../interfaces/dialog.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";
import { AddBirthday } from "../interfaces/service/service-objects.interface";
import { BirthdayUtils } from "../utils/birthday.utils";

// services
import { CalendarService } from "./calendar.service";
import { DialogService } from "./dialog.service";

@Injectable({
	providedIn: "root"
})
export class BirthdayService {
	private calendar: Calendar;
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private calendarService: CalendarService,
		private dialogService: DialogService,
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

	public modifyBirthday(birthday: Birthday, action: BirthdayAction): Observable<ResponseStatus> {
		switch (action) {
			case BirthdayAction.Add:
				return this.postBirthday(birthday);
			case BirthdayAction.Edit:
				return this.postBirthday(birthday, true, BirthdayAction.Edit);
		}
	}

	/*
	* TODO: add user ID
	*/
	public postBirthday(birthday: Birthday, showDialog = true, action = BirthdayAction.Add): Observable<ResponseStatus> {
		console.info("🍰 🏁 BirthdayService ---> postBirthday, birthday: ", birthday);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.post<Response>(
			BirthdayUtils.birthdayURLForAction(action),
			BirthdayUtils.formatBirthday(birthday),
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
				}),
				catchError(() => {
					if (showDialog) {
						this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, BirthdayUtils.birthdayDialogForAction(action));
					}
					return of(null);
				})
			)
	}

	private patchBirthday(birthday: AddBirthday) {
		this.http.post<Response>(
			BirthdayUtils.birthdayURLForAction(BirthdayAction.Edit),
			birthday,
			{
				headers: this.headers
			}
		)
			.subscribe();
	}

	public deleteBirthday(uuid: string): Observable<ResponseStatus> {
		console.info("🍰 🏁 BirthdayService ---> deleteBirthday, delete birthday: ", uuid);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.delete<Response>(
			`${BirthdayUtils.birthdayURLForAction(BirthdayAction.Delete)}/guest/${uuid}`,
			{
				headers: this.headers
			}
		)
			.pipe(
				map(() => {
					console.info("🍰 ✅ BirthdayService ---> deleteBirthday success.");
					this.dialogService.showResponseStatusDialog(ResponseStatus.SUCCESS, Dialog.DeleteBirthday);
					return ResponseStatus.SUCCESS;
				}),
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, Dialog.DeleteBirthday);
					return of(null);
				})
			)
	}

	/**
	 * @param userID 
	 * @returns A sorted list of birthdays for this user.
	 */
	public getBirthdays(userID = "guest"): Observable<AddBirthday[]> {
		console.info("🍰 🏁 BirthdayService ---> getBirthdays, for id: ", userID);

		const getBirthday = `${BirthdayUtils.birthdayURLForAction(BirthdayAction.Fetch)}/${userID}`;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.get<Response>(
			getBirthday
		)
			.pipe(
				map((response: Response) => {
					console.info("🍰 ✅ BirthdayService ---> getBirthdays, received birthdays: ", response);
					return response.responseData;
				}),
				catchError(() => {
					return of(null);
				})
			);
	}

	public addSolarBirthdays(birthdays: BirthdayList): void {
		birthdays?.lunar?.forEach((birthday: AddBirthday) => {
			if (!birthday.futureDates || typeof birthday.futureDates !== 'object') {
				birthday.futureDates = {};
			}

			const matchingDays = this.calendar?.days?.filter((day: CalendarDay) => {
				return day.cmonthname === birthday.date.cmonthname 
					&& day.cdate === birthday.date.cdate;
			});
			console.info("🍰 🏁 BirthdayService ---> updateBirthdays, find matching days: ", birthday, matchingDays);
			
			let changes = true;
			matchingDays?.forEach((day: CalendarDay) => {
				if (day.year < this.calendarService.year) {
					delete birthday.futureDates[day.year];
					changes = true;
				} else if (!birthday.futureDates[day.year]) {
					birthday.futureDates[day.year] = day;
					changes = true;
				}
			});

			/** Silently propagate changes to the server. */
			if (changes) {
				console.log("🍰 🏁 BirthdayService ---> patch birthday: ", birthday);
				this.patchBirthday(birthday);
			}
		});
	}
}
