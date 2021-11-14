import { Injectable } from "@angular/core";
import { AbstractControl, AbstractControlOptions, FormGroup, ValidatorFn } from "@angular/forms";
import { TimeUtils } from "../utils/time.utils";

/*
* Form validation methods.
*/
@Injectable({
	providedIn: "root"
})
export class ValidationService {
	private static nameRegex = new RegExp("^[A-Z][A-Za-z.\"-]+([ ][A-Z][A-Za-z.\"-]+){0,3}$");
	// eslint-disable-next-line no-useless-escape
	private static emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	// eslint-disable-next-line no-useless-escape
	private static phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

	/**
	 * Individual field validators.
	 */
	nameValidator(): ValidatorFn {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (control: AbstractControl): { [key: string]: any } => {
			if (!control.value) {
				return null;
			}
			const valid = ValidationService.nameRegex.test(control.value);
			return valid ? null : { invalidName: true };
		}
	}

	/**
	 * Form-level validators.
	 */
	emailValidator(emailKey: string, emailRequiredKey: string): ValidatorFn {
		return (group: FormGroup): AbstractControlOptions => {
			/**
			* Check if user is required to enter the email. Clear all errors first.
			*/
			const isEmailRequired = group.get(emailRequiredKey)?.value;
			const email = group?.controls[emailKey];
			email.setErrors(null);

			if (!isEmailRequired) {
				return;
			}

			if (!email.value) {
				email.setErrors({ missingEmail: true });
				return;
			}

			const valid = ValidationService.emailRegex.test(email.value);
			console.log("===> is email valid: ", email.value, valid);
			if (!valid) {
				email.setErrors({ invalidEmail: true });
			}
		}
	}

	phoneValidator(phoneKey: string, phoneRequiredKey: string): ValidatorFn {
		return (group: FormGroup): AbstractControlOptions => {
			/**
			* Check if user is required to enter the email. Clear all errors first.
			*/
			const isPhoneRequired = group.get(phoneRequiredKey)?.value;
			const phone = group?.controls[phoneKey];
			phone.setErrors(null);

			if (isPhoneRequired && !phone.value) {
				phone.setErrors({ missingPhone: true });
				return;
			}

			const valid = ValidationService.phoneRegex.test(phone?.value?.number);
			
			/**
			* If the phone number is optional, empty string is fine.
			*/
			if (!isPhoneRequired && !phone?.value?.number) {
				return;
			}
			if (!valid) {
				phone.setErrors({ invalidPhone: true });
			}
		};
	}

	/**
	 * Date and time validator.
	 */
	dateAndTimeValidator(startDate: string, startTime: string, endDate: string, endTime: string): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			const sDate = control.get(startDate).value;
			const eDate = control.get(startTime).value;
			const sTime = control.get(endDate).value;
			const eTime = control.get(endTime).value;

			if (!sDate || !eDate || !sTime || !eTime) {
				return null;
			}

			let validationMap = {};

			const startingDate = new Date(sDate.year, sDate.month - 1, sDate.value);
			const endingDate = new Date(eDate.year, eDate.month - 1, eDate.value);
			const startingTime = TimeUtils.get24HourTime(sTime);
			const endingTime = TimeUtils.get24HourTime(eTime);
			const now = new Date();
			console.log("time validation: ", new Date(sDate.year, sDate.month - 1, sDate.value), new Date(eDate.year, eDate.month - 1, eDate.value), startingTime, endingTime, now);

			const startYear = startingDate.getFullYear();
			const nowYear = now.getFullYear();
			const endYear = endingDate.getFullYear();
			const startMonth = startingDate.getMonth();
			const nowMonth = now.getMonth();
			const endMonth = endingDate.getMonth();
			const startDay = startingDate.getDate();
			const nowDay = now.getDate();
			const endDay = endingDate.getDate();

			const isSameMonth = startYear === nowYear && startMonth < nowMonth
				|| startYear === nowYear && startMonth === nowMonth;
			const isSameDay = isSameMonth && startDay === nowDay;

			// Allow users to have the start time & end time at the same time (essentially a reminder).
			if (startingDate > endingDate) {
				validationMap["startDateAfterEnd"] = true;
			}
			if (startYear === endYear && startMonth === endMonth && startDay === endDay) {
				console.log("===> check hours");
				if (startingTime.hours > endingTime.hours ||
					startingTime.hours === endingTime.hours && startingTime.minutes > endingTime.minutes) {
					validationMap["startTimeAfterEnd"] = true;
				}
			}

			console.log("validationMap: ", validationMap);
			return Object.keys(validationMap).length < 1 ? null : validationMap;
		}
	}
}
