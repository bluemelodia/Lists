import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';

import { CalendarType } from '../../../types/calendar/calendar.types';
import { SelectedDay } from '../../../types/calendar/calendar-response.types';
import { 
  EventOption, 
  EventActions, 
  eventTypes, 
  RecurrenceOption,
  recurrenceOptions,
  getRecurrenceOptionByFrequency,
  EventType
} from '../../../types/event.types';
import { HeaderLevel } from '../../../types/header.types';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  eventType = EventType;
  eventTypeOptions = eventTypes;
  eventActions: EventActions = {
    call: false,
    text: false,
    gift: false
  };
  recurrenceOptions = recurrenceOptions;

  selectedEventType: EventOption;
  selectedDate: SelectedDay;
  selectedRecurrence: RecurrenceOption;
  /**
   * Shown to the user if the respective fields are disabled.
   */
  prefilledDate: string;
  prefilledRecurrence: RecurrenceOption;
  headerLevel = HeaderLevel;

  public calendarType: CalendarType = CalendarType.Lunar;
  private paramsSub;

  private uuid = UUID.UUID();
  public eventTypeID = `app-select-event-${this.uuid}`;
  public recurrenceID = `app-select-recurrence-${this.uuid}`;

  constructor( 
    private fb: FormBuilder,
    private customValidator: ValidationService,
  ) { }

  ngOnInit(): void {
    /* Set the controls for the form. */
    this.eventForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5),
        this.customValidator.nameValidator()
      ]],
      relationship: ['', [
        Validators.required,
        Validators.minLength(3),
        this.customValidator.relationshipValidator()
      ]],
      other: ['', [
        Validators.minLength(3),
        this.customValidator.descriptionValidator()
      ]]
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  setEventSelection(eventType: EventOption): void {
    this.selectedEventType = eventType;
    console.log("selected: ", this.selectedEventType);
    this.prefilledDate = null;
    this.prefilledRecurrence = null;

    if (this.selectedEventType.month && this.selectedEventType.day) {
      this.prefilledDate = `${this.selectedEventType.month}/${this.selectedEventType.day}`;

      if (this.selectedEventType.recurrence) {
        console.log("Set recurrence: ", this.selectedEventType.recurrence);
        this.prefilledRecurrence = getRecurrenceOptionByFrequency(this.selectedEventType.recurrence);
      }
    }
  }

  setEventRecurrence(recurrence: RecurrenceOption): void {
    this.selectedRecurrence = recurrence;
  }

  setSelectedDate(selectedDate: SelectedDay): void {
    console.log("Selected date: ", selectedDate);
    this.selectedDate = selectedDate;
  }

  /* returns the form controls of the form. */
  get eventFormControl() {
    return this.eventForm.controls;
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      // this.spinner.show(Spinner.RSVP, spinnerConfig);
      // this.rsvpService.findInvite(this.invitationForm.value.name);
    }
  }
}
