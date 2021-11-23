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

			if (isEmailRequired && !email.value) {
				email.setErrors({ missingEmail: true });
				return;
			}

			/**
			* If the email is optional, empty string is fine.
			*/
			if (!isEmailRequired && !email?.value) {
				return;
			}
			
			const valid = ValidationService.emailRegex.test(email.value);
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
			
			/**
			* If the phone number is optional, empty string is fine.
			*/
			if (!isPhoneRequired && !phone?.value?.number) {
				return;
			}

			const valid = ValidationService.phoneRegex.test(phone?.value?.number);
			if (!valid) {
				phone.setErrors({ invalidPhone: true });
			}
		};
	}

	addressValidator(addressKey: string): ValidatorFn {
		return (group: FormGroup): AbstractControlOptions => {
			const address = group?.controls[addressKey];
			address.setErrors(null);

			/* User didn't enter basic address fields. */
			if (!address.value?.street && !address.value?.city && !address.value?.zip) {
				return null;
			} else {
				let validationMap = {};
				if (!address.value?.street) {
					validationMap["missingStreetAddress"] = true;
				}

				if (!address.value?.city) {
					validationMap["missingCity"] = true;
				}

				if (!address.value?.zip) {
					validationMap["missingZip"] = true;
				}
				address.setErrors(validationMap);
			}
		}
	}

	/**
	 * Date and time validator.
	 */
	dateAndTimeValidator(startDate: string, startTime: string, endDate: string, endTime: string): ValidatorFn {
		return (group: FormGroup): AbstractControlOptions => {
			const sDateCtrl = group?.controls[startDate];
			const sDate = sDateCtrl.value?.day;
			sDateCtrl.setErrors(null);

			const eDateCtrl = group?.controls[startTime];
			const eDate = eDateCtrl.value?.day;
			eDateCtrl.setErrors(null);

			const sTimeCtrl = group?.controls[endDate];
			const sTime = sTimeCtrl.value;
			sTimeCtrl.setErrors(null);

			const eTimeCtrl = group?.controls[endTime];
			const eTime = eTimeCtrl.value;
			eTimeCtrl.setErrors(null);

			if (!sDate || !eDate || !sTime || !eTime) {
				if (!sDate) {
					sDateCtrl.setErrors({
						"required": true
					});
				}
	
				if (!sTime) {
					sTimeCtrl.setErrors({
						"required": true
					});
				}
	
				if (!eDate) {
					eDateCtrl.setErrors({
						"required": true
					});
				}
	
				if (!eTime) {
					eTimeCtrl.setErrors({
						"required": true
					});
				}
				return null;
			}

			const startingDate = new Date(sDate.year, sDate.month - 1, sDate.value);
			const endingDate = new Date(eDate.year, eDate.month - 1, eDate.value);
			const startingTime = TimeUtils.get24HourTime(sTime);
			const endingTime = TimeUtils.get24HourTime(eTime);

			const startYear = startingDate.getFullYear();
			const endYear = endingDate.getFullYear();
			const startMonth = startingDate.getMonth();
			const endMonth = endingDate.getMonth();
			const startDay = startingDate.getDate();
			const endDay = endingDate.getDate();

			// Allow users to have the start time & end time at the same time (essentially a reminder).
			if (startingDate > endingDate) {
				sDateCtrl.setErrors({
					"startDateAfterEnd": true
				});
			}
			if (startYear === endYear && startMonth === endMonth && startDay === endDay) {
				if (startingTime.hours > endingTime.hours ||
					startingTime.hours === endingTime.hours && startingTime.minutes > endingTime.minutes) {
					eTimeCtrl.setErrors({
						"startTimeAfterEnd": true
					});
				}
			}
		}
	}
}
