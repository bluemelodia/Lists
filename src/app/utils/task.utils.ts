import { Status } from "../constants/tasks.constants";
import { Endpoint } from "../constants/urls.constants";
import { Task, TaskAction, TaskConfig, TaskFormSubmitActions } from "../interfaces/event/task.interface";
import { TimeUtils } from "./time.utils";

export class TaskUtils {
	private static baseURL = Endpoint.TASKS;
	private static addTaskURL = `${TaskUtils.baseURL}/addTask`;
	private static deleteTaskURL = `${TaskUtils.baseURL}/deleteTask`;
	private static editTaskURL = `${TaskUtils.baseURL}/editTask`;
	private static getTaskURL = `${TaskUtils.baseURL}/getTasks`;

	public static taskURLForAction(action: TaskAction): string {
		let url: string;

		switch (action) {
			case TaskAction.Add:
				url = TaskUtils.addTaskURL;
				break;
			case TaskAction.Delete:
				url = TaskUtils.deleteTaskURL;
				break;
			case TaskAction.Edit:
				url = TaskUtils.editTaskURL;
				break;
			case TaskAction.Fetch:
				url = TaskUtils.getTaskURL;
				break;
		}

		return url;
	}

	public static createTaskFormConfig(action: TaskAction): TaskConfig {
		const config: TaskConfig = {
			action: action,
			buttonAction: TaskFormSubmitActions[action]
		};

		return config;
	}

	public static getSummary(tasks: Task[]): Task[] {
		return tasks.filter((task: Task) => {
			return task.status !== Status.Completed;
		}).slice(0, 10);
	}

	public static sortTasks(tasks: Task[]): Task[] {
		return tasks.sort(TaskUtils.sortByDate);
	}

	private static sortByDate(a: Task, b: Task): number {
		const aTime = TimeUtils.get24HourTime(a.dueTime);
		const bTime = TimeUtils.get24HourTime(b.dueTime);

		return a.dueDate.year - b.dueDate.year
			|| a.dueDate.month - b.dueDate.month
			|| a.dueDate.value - b.dueDate.value
			|| aTime.hours - bTime.hours
			|| aTime.minutes - bTime.minutes 
			|| TaskUtils.sortByName(a.name, b.name);
	}

	private static sortByName(a: string, b: string): number {
		return a < b ? -1 : (a > b) ? 1 : 0;
	}
}