import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CalendarType } from '../../../types/calendar/calendar.types';
import { BirthdayID } from '../../../types/event.types';
import { HeaderLevel } from '../../../types/header.types';

import { BirthdayService } from '../../../services/birthday.service';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.css']
})
export class AddBirthdayComponent implements OnInit {
  birthdayForm: FormGroup;
  birthdayID = BirthdayID;
  headerLevel = HeaderLevel;

  public calendarType: CalendarType = CalendarType.Lunar;
  public submitted = false;

  constructor( 
    private fb: FormBuilder,
    private birthdayService: BirthdayService,
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
      options: this.fb.group({
        lunar: this.fb.control(false),
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

  get name(): string {
    return this.birthdayFormControl.name.value;
  }

  get date(): string {
    return this.birthdayForm.get('date.birthday')?.value;
  }

  onSubmit(): void {
    console.log("===> is form valid: ", this.birthdayForm.valid, this.birthdayForm, this.birthdayForm.controls.options);
    console.log("===> name: ", this.birthdayForm.get('name').dirty, this.birthdayForm.get('name').touched);
    this.submitted = true;
    if (this.birthdayForm.valid) {
      this.birthdayService.addBirthday({
          name: this.name,
          date: this.date,
      });
      this.submitted = false;
    }
  }
}
