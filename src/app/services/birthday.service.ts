import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BASE_URL } from '../constants/urls';

import { AddBirthday, Birthday } from '../types/birthday/birthday.types';
import { Response, ResponseStatus } from '../types/response.types';

@Injectable({
	providedIn: 'root'
})
export class BirthdayService {
	private addBirthdayURL = BASE_URL; // + 'addBirthday';
	private headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private http: HttpClient) { }

	/*
	* TODO: add user ID
	*/
	public addBirthday(birthday: Birthday): Observable<ResponseStatus> {
		console.log("Birthday: ", birthday);
		return this.http.post<Response>(
			this.addBirthdayURL, 
			this.formatBirthday(birthday),
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
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
