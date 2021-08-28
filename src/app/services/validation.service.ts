import { Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormGroup, ValidatorFn } from '@angular/forms';

/*
* Form validation methods.
*/
@Injectable({
	providedIn: 'root'
})
export class ValidationService {
	private static nameRegex = new RegExp('^[A-Z][A-Za-z.\'-]+([ ][A-Z][A-Za-z.\'-]+){1,3}$');
	private static emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
	private static phoneRegex = `/^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/`;

	constructor() { }

	/**
	 * Individual field validators.
	 */
	nameValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			if (!control.value) {
				return null;
			}
			const valid = ValidationService.nameRegex.test(control.value);
			return valid? null : { invalidName: true };
		}
	}
	
	relationshipValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			if (!control.value) {
				return null;
			}
			const regex = new RegExp('^[A-Za-z\' ]+$');
			const valid = regex.test(control.value);
			return valid? null : { invalidRelationship: true };
		}
	}

	descriptionValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			if (!control.value) {
				return null;
			}
			const regex = new RegExp('^[A-Za-z0-9,.!$\' ]+$');
			const valid = regex.test(control.value);
			return valid? null : { invalidDescription: true };
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

			if (!isPhoneRequired) {
				return;
			}

			if (!phone.value) {
				phone.setErrors({ missingPhone: true });
				return;
			}

			const valid = ValidationService.phoneRegex.match(phone.value);
			console.log("===> is phone valid: ", phone.value, valid);
			if (!valid) {
				phone.setErrors({ invalidPhone: true });
			}
		};
	}
}
