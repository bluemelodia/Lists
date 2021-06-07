import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

/*
* Form validation methods.
*/
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[A-Z][A-Za-z.\'-]+([ ][A-Z][A-Za-z.\'-]+){1,3}$');
      const valid = regex.test(control.value);
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
}
