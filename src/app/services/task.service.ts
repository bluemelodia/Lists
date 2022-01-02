import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Task, TaskAction } from "../interfaces/event/task.interface";
import { Response, ResponseStatus } from "../interfaces/response.interface";

import { TaskUtils } from "../utils/task.utils";

@Injectable({
	providedIn: "root"
})
export class TaskService {
	private headers = new HttpHeaders().set("Content-Type", "application/json");

	constructor(
		private http: HttpClient,
	) {}

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

		return this.http.post<Response>(
			TaskUtils.taskURLForAction(action),
			task,
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
		console.info("[Task Service] Delete task with uuid: ", uuid);

		return this.http.delete<Response>(
			`${TaskUtils.taskURLForAction(TaskAction.Delete)}/guest/${uuid}`,
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
	public getTasks(userID = "guest"): Observable<Task[]> {
		console.info("[Task Service] Get tasks for id: ", userID);

		const getTask = `${TaskUtils.taskURLForAction(TaskAction.Fetch)}/${userID}`;
		return this.http.get<Response>(
			getTask
		)
			.pipe(
				map((response: Response) => {
					console.info("[Task Service] Received tasks: ", response);
					return response.responseData;
				}),
				catchError(() => {
					return of(null);
				})
			);
		}
}