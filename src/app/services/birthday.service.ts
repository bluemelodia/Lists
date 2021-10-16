import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of, Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";

import {
	Birthday,
	BirthdayAction,
	BirthdayID,
} from "../interfaces/birthday.interface";
import { Calendar, CalendarDay } from "../interfaces/calendar/calendar-response.interface";
import { CalendarType } from "../interfaces/calendar/calendar.interface";
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

	public birthdaysChanged$ = new Subject<number>();

	constructor(
		private calendarService: CalendarService,
		private dialogService: DialogService,
		private http: HttpClient
	) { }

	/**
	 * Notify any consumers of a need to refresh the birthdays list.
	 * Ex. after patching has succeeded.
	 */
	get birthdaysListChanged$(): Observable<number> {
		return this.birthdaysChanged$.asObservable();
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

	public syncBirthdays(birthdayList?: AddBirthday[]): void {
		this.fetchCalendar(birthdayList);
	}

	/**
	* Fetch the calendar, or use existing. The service call only needs to be made
	* once per application lifecycle.
	*/
	private fetchCalendar(birthdayList?: AddBirthday[]) {
		if (this.calendar) {
			this.patchBirthdays(birthdayList);
		} else {
			this.calendarService.getCalendar(CalendarType.Lunar);
			this.calendarService.onCalendarFetched$
				.subscribe((calendar: Calendar) => {
					if (!calendar) {
						return;
					}

					this.calendar = calendar;
					this.patchBirthdays(birthdayList);
				});
		}
	}

	/**
	* Check the user"s birthday list, silently adding lunar birthdays
	* for the next year if not already present. When we get the user"s
	* list of birthdays, we will group the lunar birthdays together.
	*
	* We do this on the client side so that active users will have an
	* up-to-date birthdays list.
	*/
	private patchBirthdays(birthdayList?: AddBirthday[]) {
		if (birthdayList) {
			this.updateBirthdays(birthdayList);
		} else {
			this.getBirthdays("guest")
				.pipe(
					map((birthdays: AddBirthday[]) => birthdays?.filter((birthday) => birthday.lunar)),
				)
				.subscribe((birthdays: AddBirthday[]) => {
					console.info("🍰 ✅ BirthdayService ---> patchBirthdays, get birthday list: ", birthdays);
					this.updateBirthdays(birthdays);
				});
		}
	}

	private updateBirthdays(birthdays: AddBirthday[]): void {
		const birthdayBatch = [];

		birthdays?.filter((birthday) => birthday.lunar === 1).forEach((birthday: AddBirthday) => {
			const matchingDays = this.calendar?.days?.filter((day: CalendarDay) => {
				return day.cmonthname === birthday.cmonthname && day.cdate === birthday.cdate && day.year !== birthday.year;
			});
			console.info("🍰 🏁 BirthdayService ---> updateBirthdays, find matching days: ", birthday, matchingDays);
			matchingDays.forEach((day: CalendarDay) => {
				const addBirthday: Birthday = {
					name: birthday.name,
					uuid: birthday.uuid,
					date: day,
					options: {
						lunar: !!birthday.lunar,
						[BirthdayID.call]: !!birthday.call,
						[BirthdayID.text]: !!birthday.text,
						[BirthdayID.gift]: !!birthday.gift
					},
					profile: {
						image: birthday.image,
						fileName: birthday.filename
					}
				};
				console.info("🍰 🏁 BirthdayService ---> updateBirthdays, push new birthday to batch: ", addBirthday);
				birthdayBatch.push(
					this.postBirthday(addBirthday, false, BirthdayAction.Add)
				);
			});
		});

		console.info("🍰 🏁 BirthdayService ---> updateBirthdays, created birthday batch: ", birthdayBatch);

		if (birthdayBatch) {
			forkJoin(birthdayBatch)
				.subscribe((responseStatuses: ResponseStatus[]) => {
					const numChanged = responseStatuses?.filter((status: ResponseStatus) => status === ResponseStatus.SUCCESS).length;
					this.birthdaysChanged$.next(numChanged);
				});
		}
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
					return BirthdayUtils.processBirthdays(response.responseData);
				}),
				catchError(() => {
					return of(null);
				})
			);
	}
}
