import { CalendarDay } from "../calendar/calendar-response.interface";
import { RecurrenceMap } from "../../constants/tasks.constants";
import { FormSubmitAction } from "./event.interface";

export interface TaskConfig {
	action: TaskAction,
	buttonAction: string,
}

export interface Task {
	id?: string;
	uuid?: string;
	description?: string;
	dueDate?: CalendarDay;
	dueTime?: string;
	name: string;
	recurrence?: RecurrenceMap;
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