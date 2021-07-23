import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

	public getBirthdays(id: string): Observable<AddBirthday[]> {
		console.log("===> get birthdays for id: ", id);

		const userID = id ? id : "guest";
		const getBirthday = `${this.getBirthdayURL}/${userID}`;
		return this.http.get<Response>(
			getBirthday
		)
			.pipe(
				map((response: Response) => {
					console.log("===> received birthdays: ", response);
					return [];
				})
			);
	}

	private formatBirthday(birthday: Birthday): AddBirthday {
		const date = birthday.date;
		const addBirthday: AddBirthday = {
			id: '',
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
}
