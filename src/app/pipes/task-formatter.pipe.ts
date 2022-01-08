import { Pipe, PipeTransform } from "@angular/core";

import { Task } from "../interfaces/event/task.interface";
import { TimeUtils } from '../utils/time.utils';

@Pipe({
	name: "taskFormatter"
})
export class TaskFormatterPipe implements PipeTransform {
	public transform(value: Task): string {
		if (value) {
			let startDateFormatted;

			if (value.dueDate) {
				const dueDate = value.dueDate;
				const date = new Date(dueDate.year, dueDate.month - 1, dueDate.value);

				startDateFormatted = `${TimeUtils.getDayOfWeek(date.getDay())} - ${TimeUtils.getMonth(date.getMonth())} ${TimeUtils.getDateOfMonth(date.getDate())}`;
				startDateFormatted += `, ${date.getFullYear()}`;
			}

			if (value.dueDate && value.dueTime) {
				startDateFormatted += ' - ';
			}

			if (value.dueTime) {
				startDateFormatted += value.dueTime;
			}

			return startDateFormatted;
		}
		return "-";
	}
}
