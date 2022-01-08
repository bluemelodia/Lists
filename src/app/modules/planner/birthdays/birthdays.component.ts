import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnDestroy,
	OnInit
} from "@angular/core";
import { of, Subject } from "rxjs";
import { catchError, finalize, take, takeUntil } from "rxjs/operators";

import { DialogService } from "../../../services/dialog.service";
import { LoadingService } from "../../../services/loading.service";
import { RecipientService } from "../../../services/recipient.service";

import { DialogAction, DialogPage } from "../../../interfaces/dialog.interface";
import { RecipientList } from "../../../interfaces/event/recipient.interface";
import { ResponseStatus } from "../../../interfaces/response.interface";
import { AddRecipient } from "../../../interfaces/service/service-objects.interface";

@Component({
	selector: "planner-birthdays",
	templateUrl: "./birthdays.component.html",
	styleUrls: ["./birthdays.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirthdaysComponent implements OnInit, OnDestroy {
	@HostBinding("class") public get hostClasses(): string {
		const hostStyles = [];

		if (this.isLoading) {
			hostStyles.push("hide-container");
		}

		return hostStyles.join(" ");
	}

	private solarRecipients$ = new Subject<AddRecipient[]>();
	public solarList$ = this.solarRecipients$.asObservable();

	private lunarRecipients$ = new Subject<AddRecipient[]>();
	public lunarList$ = this.lunarRecipients$.asObservable();

	private isLoading = false;
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
		private dialogService: DialogService,
		private loadingService: LoadingService,
		private recipientService: RecipientService,
	) { }

	public ngOnInit(): void {
		this.addSubscriptions();
		this.getRecipients();
	}

	private addSubscriptions(): void {
		this.loadingService.loadingChanged$
			.pipe(
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((loading: boolean) => {
				this.isLoading = loading;
			});
	}

	/**
	* Fetch the latest list of birthdays. Refresh should be set to true if
	* we're fetching the birthdays list as a result of a patch - otherwise,
	* it should be false.
	*/
	public getRecipients(): void {
		this.loadingService.startLoading();
		this.recipientService.getRecipients()
			.pipe(
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, DialogAction.Get, DialogPage.Recipient);
					this.loadingService.stopLoading();
					return of(null);
				}),
				finalize(() => {
					this.loadingService.stopLoading();
				}),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((birthdayList: RecipientList) => {
				console.info("[Birthday List] Received birthday list: ", birthdayList);
				this.solarRecipients$.next(birthdayList.solar);
				this.lunarRecipients$.next(birthdayList.lunar);
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
