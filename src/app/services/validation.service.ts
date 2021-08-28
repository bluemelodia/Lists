import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { Channel } from '../modules/settings/types/settings.types';

/*
* Form validation methods.
*/
@Injectable({
	providedIn: 'root'
})
export class ValidationService {
	private static nameRegex = new RegExp('^[A-Z][A-Za-z.\'-]+([ ][A-Z][A-Za-z.\'-]+){1,3}$');
	private static emailRegex = new RegExp(`/^[a-zA-Z0-9.!#$%&'*+\/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}
		[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/`);

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
		return (group: FormGroup) => {
			/**
			* Check if user is required to enter the email.
			*/
			const isEmailRequired = group.get(emailRequiredKey)?.value;
			console.log("===> email required: ", isEmailRequired);
			if (!isEmailRequired) {
				return null;
			}

			const email = group?.controls[emailKey];
			console.log("===> email: ", email);
			if (!email.value) {
				email.setErrors({ missingEmail: true });
			}

			const valid = ValidationService.emailRegex.test(email.value);
			if (!valid) {
				email.setErrors({ invalidEmail: true });
			}
		}
	}
}
