import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "../interfaces/event/task.interface";

@Pipe({
	name: "taskCalendar"
})
export class TaskCalendarPipe implements PipeTransform {
	public transform(value: Task): string {
		return `${value.name} - ${value.dueTime}`;
	}
}
