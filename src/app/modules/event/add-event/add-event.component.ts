import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CalendarType } from '../../../types/calendar/calendar.types';
import { HeaderLevel } from '../../../types/header.types';
import { SelectedDay } from '../../../types/calendar/calendar-response.types';
import { 
  EventActions, 
} from '../../../types/event.types';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
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
  private paramsSub;

  constructor( 
    private fb: FormBuilder,
    private customValidator: ValidationService,
  ) { }

  ngOnInit(): void {
    /* Set the controls for the form. */
    this.birthdayForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        this.customValidator.nameValidator()
      ]]
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
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
    if (this.birthdayForm.valid) {
      // this.spinner.show(Spinner.RSVP, spinnerConfig);
      // this.rsvpService.findInvite(this.invitationForm.value.name);
    }
  }
}
