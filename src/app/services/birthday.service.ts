import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BirthdayAction } from '../constants/birthday';

import { AddBirthday, Birthday } from '../types/birthday/birthday.types';
import { Calendar, CalendarDay } from '../types/calendar/calendar-response.types';
import { Dialog } from '../types/dialog/dialog.types';
import { BirthdayID } from '../types/event.types';
import { Response, ResponseStatus } from '../types/response.types';
import { BirthdayUtils } from '../utils/birthday.utils';

import { DialogService } from './dialog.service';

@Injectable({
	providedIn: 'root'
})
export class BirthdayService {
	private headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(
		private dialogService: DialogService,
		private http: HttpClient
	) { }
	
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
		console.info("🍰 🏁 BirthdayService, add a birthday: ", birthday);
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
				catchError((err) => {
					if (showDialog) {
						this.dialogService.showStatusDialog(ResponseStatus.ERROR, BirthdayUtils.birthdayDialogForAction(action));
					}
					return of(null);				
				})
			)
	}

	public deleteBirthday(uuid: string): Observable<ResponseStatus> {
		console.info("🍰 🏁 BirthdayService, delete birthday: ", uuid);
		return this.http.delete<Response>(
			`${BirthdayUtils.birthdayURLForAction(BirthdayAction.Delete)}/guest/${uuid}`,
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					console.info("🍰 ✅ BirthdayService, delete birthday success: ", response);
					this.dialogService.showStatusDialog(ResponseStatus.SUCCESS, Dialog.DeleteBirthday);
					return ResponseStatus.SUCCESS;
				}),
				catchError((err) => { 
					this.dialogService.showStatusDialog(ResponseStatus.ERROR, Dialog.DeleteBirthday);
					return of(null);				
				})
			)
	}

	public updateBirthdays(calendar: Calendar, birthdays: AddBirthday[]): void {
		birthdays.forEach((birthday: AddBirthday) => {
			const matchingDays = calendar.days.filter((day: CalendarDay) => {
				return day.cmonthname === birthday.cmonthname && day.cdate === birthday.cdate;
			});
			console.info("🍰 🏁 BirthdayService, find matching days: ", birthday, matchingDays);
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
					}
				};
				this.postBirthday(addBirthday, false, BirthdayAction.Add).subscribe();
			});
		});
	}

	/**
	 * @param userID 
	 * @returns A sorted list of birthdays for this user.
	 */
	public getBirthdays(userID: string = "guest"): Observable<AddBirthday[]> {
		console.info("🍰 🏁 BirthdayService, get birthdays for id: ", userID);

		const getBirthday = `${BirthdayUtils.birthdayURLForAction(BirthdayAction.Fetch)}/${userID}`;
		return this.http.get<Response>(
			getBirthday
		)
			.pipe(
				map((response: Response) => {
					console.info("🍰 ✅ BirthdayService, received birthdays: ", response);
					return BirthdayUtils.sortAndTagBirthdays(response.responseData);
				}),
				catchError((err) => { 
					return of(null);				
				})
			);
	}
}
