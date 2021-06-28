import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CalendarType } from '../../../types/calendar/calendar.types';
import { HeaderLevel } from '../../../types/header.types';
import { 
  BirthdayAction,
  BirthdayID,
} from '../../../types/event.types';

import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.css']
})
export class AddBirthdayComponent implements OnInit {
  birthdayForm: FormGroup;
  birthdayAction: BirthdayAction;
  headerLevel = HeaderLevel;

  public calendarType: CalendarType = CalendarType.Lunar;
  public submitted = false;

  constructor( 
    private fb: FormBuilder,
    private customValidator: ValidationService,
  ) { }

  ngOnInit(): void {
    /* Set the controls for the form. */
    this.birthdayForm = this.fb.group({
      name: [
        '', 
        [
          Validators.required,
          Validators.minLength(5),
          this.customValidator.nameValidator()
        ],
      ],
      date: this.fb.group({
        birthday: ['', [Validators.required]],
      }),
      lunar: this.fb.control(false),
      options: this.fb.group({
        [BirthdayID.call]: this.fb.control(false),
        [BirthdayID.text]: this.fb.control(false),
        [BirthdayID.gift]: this.fb.control(false),
      })
    },
    { 
      updateOn: 'submit'
    });
  }

  /* returns the form controls of the form. */
  get birthdayFormControl() {
    return this.birthdayForm.controls;
  }

  get lunarFormControl() {
    return this.birthdayFormControl.lunar;
  }

  get checkboxFormControls() {
    return this.birthdayForm.get('options');
  }

  public toggleLunarValue() {
    this.birthdayForm.get('lunar').patchValue(!this.lunarFormControl.value);
  }

  onSubmit(): void {
    this.submitted = true;
    console.log("===> is form valid: ", this.birthdayForm.valid, this.birthdayForm, this.birthdayForm.controls.options);
    console.log("===> name: ", this.birthdayForm.get('name').dirty, this.birthdayForm.get('name').touched);
  }
}
