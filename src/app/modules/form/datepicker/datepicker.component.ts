import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

import { of, ReplaySubject } from "rxjs";
import { catchError, filter, map, takeUntil } from "rxjs/operators";
import { UUID } from "angular2-uuid";

import { PickerDateFormatterPipe } from "../../../pipes/picker-date-formatter.pipe";

import { CalendarService } from "../../../services/calendar.service";
import { ClickService } from "../../../services/click.service";
import { FocusService } from "../../../services/focus.service";

import { CalendarType } from "../../../interfaces/calendar/calendar.interface";
import { Calendar, CalendarDay } from "../../../interfaces/calendar/calendar-response.interface";
import { FocusEvent, Key } from "../../../interfaces/focus.interface";
import { noCalMessage } from "../../../interfaces/message.interface";

interface CalendarData {
	calendar: Calendar;
	isLoading: boolean;
	showCal: boolean;
}

@Component({
	selector: "app-datepicker",
	templateUrl: "./datepicker.component.html",
	styleUrls: ["./datepicker.component.css"]
})
export class DatepickerComponent implements OnInit, OnDestroy {
	@Input() placeholder = "";
	@Input() fieldName = "Date";
	@Input() controlName: string = "";
	@Input() calendarType: CalendarType = CalendarType.Lunar;
	@Input() form: FormGroup;
	@Input() submitted;

	@ViewChild("picker", { read: ElementRef, static: false }) picker: ElementRef;

	public noCalMessage = noCalMessage;

	public cal: Calendar;
	private uuid = UUID.UUID();
	public calendarId = `app-calendar-${this.uuid}`;

	private calendarData: CalendarData = {
		isLoading: false,
		calendar: null,
		showCal: false,
	};
	private calendarData$ = new ReplaySubject<CalendarData>();
	public calendar$ = this.calendarData$.asObservable();

	private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

	constructor(
		private readonly calendar: CalendarService,
		private readonly clickService: ClickService,
		private readonly dateFormatterPipe: PickerDateFormatterPipe,
		private readonly focus: FocusService,
	) { }

	public ngOnInit(): void {
		this.setupSubscriptions();
		this.calendar.getCalendar(this.calendarType);
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	private setupSubscriptions() {
		this.clickService.clicked
			.pipe(takeUntil(this.destroyed$))
			.subscribe(target => {
				this.onDocumentClick(target);
			});

		this.calendar.onCalendarFetched$
			.pipe(
				takeUntil(this.destroyed$),
				map((calendar: Calendar) => {
					console.info("===> calendar: ", calendar);
					if (!calendar) {
						throw new Error('Unable to fetch calendar.');
					}

					this.cal = calendar;
					this.calendarData = {
						...this.calendarData,
						isLoading: false,
						calendar: this.cal,
					};
					this.calendarData$.next(this.calendarData);
					return of(null);
				}),
				catchError(() => {
					this.toggleLoading(false);
					return of(null);
				})
			)
			.subscribe();

		this.focus.keyPressed$()
			.pipe(
				filter((event: FocusEvent) => event.elementID === this.calendarId),
				takeUntil(this.destroyed$)
			)
			.subscribe((event: FocusEvent) => {
				switch (event.key) {
					case Key.Escape:
						// console.info("Event: ", event, this.showCal);
						if (this.calendarData.showCal) {
							this.showHideCal();
						}
						break;
				}
			});
	}

	/* returns the form controls of the form. */
	public get dateFormControl(): { [key: string]: AbstractControl } {
		return this.form?.controls;
	}

	private onDocumentClick(target: any): void {
		if (!this.picker.nativeElement.contains(target)) {
			if (this.calendarData.showCal) {
				this.showHideCal();
			}
		}
	}

	public onKeydownEvent(event: KeyboardEvent): void {
		if (event.key === "Enter" || event.key === " ") {
			this.showHideCal();
		}
	}

	private toggleLoading(isLoading: boolean): void {
		this.calendarData.isLoading = isLoading;
		this.calendarData$.next(this.calendarData);
	}

	public showHideCal(): void {
		this.calendarData.showCal = !this.calendarData.showCal;
		this.calendarData$.next(this.calendarData);
	}

	public selectDate(date: CalendarDay): void {
		this.form.patchValue({
			day: date
		});
		this.showHideCal();
	}
}
