import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {v4 as uuidv4} from 'uuid';

import { BASE_URL } from '../constants/urls';

import { AddBirthday, Birthday } from '../types/birthday/birthday.types';
import { Dialog } from '../types/dialog/dialog.types';
import { Response, ResponseStatus } from '../types/response.types';

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
	public addBirthday(birthday: Birthday): Observable<ResponseStatus> {
		console.log("===> add a birthday: ", birthday);
		return this.http.post<Response>(
			this.addBirthdayURL, 
			this.formatBirthday(birthday),
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
					this.dialogService.showStatusDialog(ResponseStatus.ERROR, Dialog.AddBirthday);
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

	public updateBirthays(userID: string = "guest"): void {


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
					return this.sortBirthdays(response.responseData);
				}),
				catchError((err) => { 
					this.dialogService.showStatusDialog(ResponseStatus.ERROR, Dialog.GetBirthday);
					return of(null);				
				})
			);
	}

	private formatBirthday(birthday: Birthday): AddBirthday {
		const date = birthday.date;
		const addBirthday: AddBirthday = {
			id: 'guest',
			uuid: uuidv4(),
			cmonth: date.cmonth,
			month: date.month,
			cdate: date.cdate,
			date: date.value,
			year: date.year,
			name: birthday.name,
			call: birthday.options.call ? 1 : 0,
			text: birthday.options.text ? 1 : 0,
			gift: birthday.options['buy-present'] ? 1 : 0,
			leap: date.leap ? 1 : 0,
			cmonthname: date.cmonthname,
			lunar: birthday.options.lunar ? 1 : 0,
		};
		return addBirthday;
	}

	private sortBirthdays(birthdays: AddBirthday[]): AddBirthday[] {
		return birthdays.sort(this.sortByBirthDate);
	}

	private sortByBirthDate(a: AddBirthday, b: AddBirthday): number {
		return a.month - b.month || a.date - b.date;
	}
}
