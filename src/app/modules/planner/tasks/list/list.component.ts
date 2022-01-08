import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

import { Event } from "../../../../constants/events.contants";
import { Icon } from "../../../../constants/icons.constants";

import { ConfirmDialogAction, DialogAction, DialogPage } from "../../../../interfaces/dialog.interface";
import { Task } from "../../../../interfaces/event/task.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import { NO_ITEMS_CONFIG } from "../../../../interfaces/no-items.interface";
import { ResponseStatus } from "../../../../interfaces/response.interface";

import { DialogService } from "../../../../services/dialog.service";
import { EditService } from "../../../../services/edit.service";
import { TaskService } from "../../../../services/task.service";

@Component({
	selector: 'planner-tasks-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent {
	@Input() list: Task[] = [];

	@Output() deletedTask = new EventEmitter();

	public headerLevel = HeaderLevel;
	public icon = Icon;
	public noItemsConfig = NO_ITEMS_CONFIG[Event.Task];

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
		private editService: EditService,
		private taskService: TaskService,
		private router: Router,
	) { }

	public onDeleteClicked(uuid: string): void {
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Delete, DialogPage.Tasks)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: ConfirmDialogAction) => {
				switch (action) {
					case ConfirmDialogAction.Continue:
						this.deleteTask(uuid);
						break;
					default:
						break;
				}
			});
	}

	public deleteTask(uuid: string): void {
		this.taskService.deleteTask(uuid)
			.pipe(
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((response: ResponseStatus) => {
				this.dialogService.showResponseStatusDialog(response, DialogAction.Delete, DialogPage.Tasks);

				if (response === ResponseStatus.SUCCESS) {
					this.deletedTask.emit(null);
				}
			});
	}

	public editTask(task: Task): void {
		this.editService.editTask(task);
		this.router.navigate(["/events/edit-task"], {
			queryParams: { title: 'Edit Task' }
		});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}