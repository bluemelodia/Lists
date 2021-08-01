import { Pipe, PipeTransform } from '@angular/core';
import { CalendarDay } from '../types/calendar/calendar-response.types';

@Pipe({
	name: 'pickerDateFormatter'
})
export class PickerDateFormatterPipe implements PipeTransform {
	public transform(value: CalendarDay, ...args: unknown[]): unknown {
		if (value) {
			const cmonthStr = value.cmonth ? ` - ${value.cmonthname} ${value.cmonth}/${value.cdate}` : '';
			return `${value.month}/${value.value}/${value.year}${cmonthStr}`;
		}
		return null;
	}
}
