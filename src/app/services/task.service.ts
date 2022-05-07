import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Task, TaskAction } from "../interfaces/event/task.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";

import { UserService } from "./user.service";
import { TaskUtils } from "../utils/task.utils";

@Injectable({
	providedIn: "root"
})
export class TaskService {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private http: HttpClient,
		private userService: UserService,
	) { }

	public modifyTask(task: Task, action: TaskAction): Observable<ResponseStatus> {
		switch (action) {
			case TaskAction.Add:
				return this.postTask(task);
			case TaskAction.Edit:
				return this.postTask(task, TaskAction.Edit);
		}
	}

	public postTask(task: Task, action = TaskAction.Add): Observable<ResponseStatus> {
		console.info("[Task Service] Post or edit task: ", task);
		const userID = this.userService.getUser();
		const userTask = {
			...task,
			id: userID
		};

		return this.http.post<Response>(
			TaskUtils.taskURLForAction(action),
			userTask,
			{
				headers: this.headers
			}
		)
			.pipe(
				map((response: Response) => {
					return !response.statusCode ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
				}),
				catchError(() => {
					return of(ResponseStatus.ERROR);
				})
			)
	}

	public deleteTask(uuid: string): Observable<ResponseStatus> {
		const userID = this.userService.getUser();
		console.info("[Task Service] Delete task with uuid: ", uuid);

		return this.http.delete<Response>(
			`${TaskUtils.taskURLForAction(TaskAction.Delete)}/${userID}/${uuid}`,
			{
				headers: this.headers
			}
		)
			.pipe(
				map(() => {
					return ResponseStatus.SUCCESS;
				}),
				catchError(() => {
					return of(ResponseStatus.ERROR);
				})
			)
	}

	/**
	* @param userID 
	* @returns A sorted list of birthdays for this user.
	*/
	public getTasks(): Observable<Task[]> {
		const userID = this.userService.getUser();
		console.info("[Task Service] Get tasks for id: ", userID);

		const getTask = `${TaskUtils.taskURLForAction(TaskAction.Fetch)}/${userID}`;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.http.get<Response>(
			getTask
		)
			.pipe(
				map((response: Response) => {
					return TaskUtils.sortTasks(response.responseData as Task[]);
				}),
				catchError(() => {
					return of(null);
				})
			);
	}
}