import { Pipe, PipeTransform } from '@angular/core';
import { SelectedDay } from '../types/calendar/calendar-response.types';

@Pipe({
	name: 'pickerDateFormatter'
})
export class PickerDateFormatterPipe implements PipeTransform {
	public transform(value: SelectedDay, ...args: unknown[]): unknown {
		if (value) {
			const cmonthStr = value.cmonth ? ` - ${value.cmonthname} ${value.cmonth}/${value.cdate}` : '';
			return `${value.month}/${value.value}/${value.year}${cmonthStr}`;
		}
		return null;
	}
}
