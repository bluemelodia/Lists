import { Pipe, PipeTransform } from '@angular/core';
import { CalendarDay } from '../interfaces/calendar/calendar-response.interface';

@Pipe({
	name: 'pickerDateFormatter'
})
export class PickerDateFormatterPipe implements PipeTransform {
	public transform(value: CalendarDay): unknown {
		if (value) {
			const cmonthStr = value.cmonth ? ` - ${value.cmonthname} ${value.cmonth}/${value.cdate}` : '';
			return `${value.month}/${value.value}/${value.year}${cmonthStr}`;
		}
		return null;
	}
}
