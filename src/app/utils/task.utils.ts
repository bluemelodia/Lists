import { Endpoint } from "../constants/urls.constants";
import { TaskAction, TaskConfig, TaskFormSubmitActions } from "../interfaces/event/task.interface";

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
}