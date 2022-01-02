import { CalendarDay } from "../calendar/calendar-response.interface";
import { FormSubmitAction } from "./event.interface";

export interface TaskConfig {
	action: TaskAction,
	buttonAction: string,
}

export enum Recurrence {
	Once = 'Once',
	Daily = 'Daily',
	Weekly = 'Weekly',
	Monthly = 'Monthly',
	Sunday = 'Sunday',
	Monday = 'Monday',
	Tuesday = 'Tuesday',
	Wednesday = 'Wednesday',
	Thursday = 'Thursday',
	Friday = 'Friday',
	Saturday = 'Saturday',
}

export interface Task {
	id?: string;
	uuid?: string;
	description?: string;
	dueDate?: CalendarDay;
	dueTime?: string;
	task: string;
	recurrence?: Recurrence;
}

export enum TaskAction {
	Add = "Add",
	Delete = "Delete",
	Edit = "Edit",
	Fetch = "Fetch",
}

export const TaskFormSubmitActions: FormSubmitAction = {
	[TaskAction.Add]: "Submit",
	[TaskAction.Edit]: "Update"
}