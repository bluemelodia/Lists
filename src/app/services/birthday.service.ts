import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BASE_URL } from '../constants/urls';

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
	private addBirthdayURL = BASE_URL + 'addBirthday';
	private getBirthdayURL = BASE_URL + 'getBirthdays';
	private deleteBirthdayURL = BASE_URL + 'deleteBirthday';
	private headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(
		private dialogService: DialogService,
		private http: HttpClient
	) { }
	
	/*
	* TODO: add user ID
	*/
	public addBirthday(birthday: Birthday, showDialog = true): Observable<ResponseStatus> {
		console.log("===> add a birthday: ", birthday);
		return this.http.post<Response>(
			this.addBirthdayURL, 
			BirthdayUtils.formatBirthday(birthday),
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					console.log("===> got add birthday response in service: ", response);
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
				}),
				catchError((err) => { 
					if (showDialog) {
						this.dialogService.showStatusDialog(ResponseStatus.ERROR, Dialog.AddBirthday);
					}
					return of(null);				
				})
			)
	}

	public deleteBirthday(uuid: string): Observable<ResponseStatus> {
		console.log("==> delete: ", uuid, `${this.deleteBirthdayURL}/guest/${uuid}`);
		return this.http.delete<Response>(
			`${this.deleteBirthdayURL}/guest/${uuid}`,
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					console.log("Response: ", response);
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
			console.log("===> matchingDays: ", birthday, matchingDays);
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
				this.addBirthday(addBirthday, false);
			});
		});
	}

	/**
	 * @param userID 
	 * @returns A sorted list of birthdays for this user.
	 */
	public getBirthdays(userID: string = "guest"): Observable<AddBirthday[]> {
		console.log("===> get birthdays for id: ", userID);

		const getBirthday = `${this.getBirthdayURL}/${userID}`;
		return this.http.get<Response>(
			getBirthday
		)
			.pipe(
				map((response: Response) => {
					console.log("===> received birthdays: ", response);
					return BirthdayUtils.sortBirthdays(response.responseData);
				}),
				catchError((err) => { 
					this.dialogService.showStatusDialog(ResponseStatus.ERROR, Dialog.GetBirthday);
					return of(null);				
				})
			);
	}
}
