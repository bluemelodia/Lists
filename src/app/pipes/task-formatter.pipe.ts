import { Pipe, PipeTransform } from "@angular/core";

import { Task } from "../interfaces/event/task.interface";
import { TimeUtils } from '../utils/time.utils';

@Pipe({
	name: "taskFormatter"
})
export class TaskFormatterPipe implements PipeTransform {
	public transform(value: Task, shorthand: boolean): string {
		const hasDueDate = Object.keys(value?.dueDate)?.length > 0;
		const hasDueTime = !!value?.dueTime;

		if (hasDueDate || hasDueTime) {
			let startDateFormatted = '';

			if (hasDueDate) {
				const dueDate = value.dueDate;
				const date = new Date(dueDate.year, dueDate.month - 1, dueDate.value);

				if (shorthand) {
					startDateFormatted = `${dueDate.month}/${dueDate.value}/${dueDate.year.toString().slice(-2)}`;
				} else {
					startDateFormatted += `${TimeUtils.getDayOfWeek(date.getDay())} - ${TimeUtils.getMonth(date.getMonth())} ${TimeUtils.getDateOfMonth(date.getDate())}`;
					startDateFormatted += `, ${date.getFullYear()}`;
				}
			}

			if (hasDueDate && hasDueTime) {
				startDateFormatted += ' - ';
			}

			if (hasDueTime) {
				startDateFormatted += value.dueTime;
			}

			return startDateFormatted;
		}
		return "-";
	}
}
