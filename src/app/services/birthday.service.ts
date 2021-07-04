import { Injectable } from '@angular/core';
import { Birthday } from '../types/birthday/birthday.types';

@Injectable({
	providedIn: 'root'
})
export class BirthdayService {
	public addBirthday(birthday: Birthday) {
		console.log("Birthday: ", birthday);
	}
}