import { Component, HostBinding, OnInit } from "@angular/core";
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

import { FormLimit } from "../../../../constants/gifts.constants";
import { Recurrence } from "../../../../constants/tasks.constants";
import { Topic } from "../../../../constants/topics.constants";

import { CalendarType } from "../../../../interfaces/calendar/calendar.interface";
import { CalendarDay } from "../../../../interfaces/calendar/calendar-response.interface";
import {
	ConfirmDialogAction,
	DialogAction,
	DialogPage,
} from "../../../../interfaces/dialog.interface";
import { Task, TaskAction } from "../../../../interfaces/event/task.interface";
import { HeaderLevel } from "../../../../interfaces/header.interface";
import { ResponseStatus } from "../../../../interfaces/response.interface";

import { appTheme } from "../../../../modules/form/timepicker/time-picker.constants";

import { DialogService } from "../../../../services/dialog.service";
import { EditService } from "../../../../services/edit.service";
import { NavService } from "../../../../services/nav.service";
import { TaskService } from "../../../../services/task.service";
import { ValidationService } from "../../../../services/validation.service";

import { TaskUtils } from "../../../../utils/task.utils";

@Component({
	selector: "app-add-task",
	templateUrl: "./add.component.html",
	styleUrls: ["./add.component.css"]
})
export class AddTaskComponent implements OnInit {
	@HostBinding("class") containerClasses = "section-container";

	public calendarType: CalendarType = CalendarType.Solar;
	public headerLevel = HeaderLevel;
	public limit = FormLimit;
	public submitted = false;
	public task: Task;
	public taskConfig = TaskUtils.createTaskFormConfig(TaskAction.Add);
	public taskForm: FormGroup;
	public timePickerTheme = appTheme;
	public topic = Topic.Meetings;

	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private customValidators: ValidationService,
		private dialogService: DialogService,
		private editService: EditService,
		private fb: FormBuilder,
		private navService: NavService,
		private route: ActivatedRoute,
		private router: Router,
		private taskService: TaskService,
	) { }

	ngOnInit(): void {
		/* Set the controls for the form. */
		this.taskForm = this.fb.group({
			name: [
				"",
				[
					Validators.required,
					Validators.minLength(this.limit.Task.min),
					Validators.maxLength(this.limit.Task.max),
				],
			],
			dueDate: this.fb.group({
				day: [""],
			}),
			dueTime: [
				""
			],
			description: [
				"",
				[
					Validators.maxLength(this.limit.Description.max),
				]
			],
			recurrence: this.fb.group({
				taskRecurrence: ["", [Validators.required]],
			}),
		},
			{
				updateOn: "submit",
				validators: [
					this.customValidators.dueDateAndTimeValidator("dueDate.day", "dueTime")
				]
			});

		this.router.events
			.pipe(
				filter(event => event instanceof NavigationStart)
			)
			.subscribe((event: NavigationStart) => {
				console.info("[Add Task] Routed to: ", event.url);

				if (event.url.includes('/events/add-task')) {
					this.editService.clearItem(Topic.Tasks);
				}
			});

		const task = this.editService.getItem(Topic.Tasks) as Task;
		if (task) {
			/** Existing task. */
			if (task?.uuid) {
				this.taskConfig = TaskUtils.createTaskFormConfig(TaskAction.Edit);
				this.task = {
					...this.task,
					uuid: task?.uuid
				};
				this.populateFormData(task);
			}
		}
	}

	private populateFormData(task: Task): void {
		console.info("[Add Task] Populate form data: ", task);

	}

	/* returns the form controls of the form. */
	get taskFormControl(): { [key: string]: AbstractControl } {
		return this.taskForm.controls;
	}

	get name(): string {
		return this.taskFormControl.name.value;
	}

	get dueDateCtrl(): AbstractControl {
		return this.taskForm.get("dueDate.day");
	}

	get dueDate(): CalendarDay {
		return this.taskForm.get("dueDate.day")?.value;
	}

	get dueTime(): string {
		return this.taskFormControl.dueTime.value;
	}

	get description(): string {
		return this.taskFormControl.description.value;
	}

	get recurrence(): Recurrence {
		return this.taskForm.get("recurrence.taskRecurrence")?.value;
	}

	onDueTimeChanged($event): void {
		this.taskForm.patchValue({
			dueTime: $event,
		});
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.taskForm.valid) {
			this.submitted = false;
			this.task = {
				...this.task,
				name: this.name,
				description: this.description,
				recurrence: this.recurrence,
				dueDate: this.dueDate,
				dueTime: this.dueTime,
			};

			console.info("[Add Task] Add task: ", this.task);
			this.taskService.modifyTask(this.task, this.taskConfig.action)
				.pipe(
					take(1),
					takeUntil(this.ngUnsubscribe$)
				)
				.subscribe((response: ResponseStatus) => {
					switch (this.taskConfig.action) {
						case TaskAction.Add:
							this.dialogService.showResponseStatusDialog(response, DialogAction.Add, DialogPage.Tasks);
							break;
						case TaskAction.Edit:
							this.dialogService.showResponseStatusDialog(response, DialogAction.Edit, DialogPage.Tasks);
							break;
					}

					if (response === ResponseStatus.SUCCESS) {
						this.subscribeToDialogClose();
					}
				});
		}
	}

	onCancel(): void {
		this.dialogService.showConfirmDialog(ConfirmDialogAction.Cancel, DialogPage.Tasks)
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((action: ConfirmDialogAction) => {
				switch (action) {
					case ConfirmDialogAction.Continue:
						this.navService.navigateToTopic(Topic.Tasks, { relativeTo: this.route });
						break;
					default:
						break;
				}
			});
	}

	subscribeToDialogClose(): void {
		this.dialogService.onConfirmDialogAction$
			.pipe(
				filter((action: ConfirmDialogAction) => action === ConfirmDialogAction.Close),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe(() => {
				/**
				* Once the user successfully edits the form, take them back to the meeting list.
				*/
				this.navService.navigateToTopic(Topic.Tasks, { relativeTo: this.route });
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}