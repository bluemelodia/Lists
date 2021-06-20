import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CalendarType } from '../../../types/calendar/calendar.types';
import { HeaderLevel } from '../../../types/header.types';
import { SelectedDay } from '../../../types/calendar/calendar-response.types';
import { 
  EventActions, 
} from '../../../types/event.types';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.css']
})
export class AddBirthdayComponent implements OnInit {
  birthdayForm: FormGroup;
  birthdayActions: EventActions = {
    call: false,
    text: false,
    gift: false
  };
  headerLevel = HeaderLevel;
  isLunar = false;
  selectedDate: SelectedDay;

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
      })
    },
    { 
      updateOn: 'submit'
    });
  }

  setSelectedDate(selectedDate: SelectedDay): void {
    console.log("Selected date: ", selectedDate);
    this.selectedDate = selectedDate;
  }

  /* returns the form controls of the form. */
  get birthdayFormControl() {
    return this.birthdayForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log("===> is form valid: ", this.birthdayForm.valid);
    console.log("===> name: ", this.birthdayForm.get('name').dirty, this.birthdayForm.get('name').touched);
    console.log("===> submit: ", this.isLunar, this.birthdayActions, this.birthdayForm);
  }
}
