import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnDestroy,
	OnInit
} from "@angular/core";
import { of, Subject } from "rxjs";
import { catchError, finalize, take, takeUntil } from "rxjs/operators";

import { LoadingService } from "../../../services/loading.service";
import { RecipientService } from "../../../services/recipient.service";

import { RecipientList } from "../../../interfaces/event/recipient.interface";
import { ResponseStatus } from "../../../interfaces/response.interface";
import { AddRecipient } from "../../../interfaces/service/service-objects.interface";

interface RecipientResponse {
	error: boolean,
	solar?: AddRecipient[],
	lunar?: AddRecipient[],
}

@Component({
	selector: "ml-planner-birthdays",
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

	private _recipientResponse$ = new Subject<RecipientResponse>();
	public recipientResponse$ = this._recipientResponse$.asObservable();

	private isLoading = false;
	private ngUnsubscribe$ = new Subject<void>();

	constructor(
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
				catchError((error: ResponseStatus) => {
					if (error === ResponseStatus.ERROR) {
						this._recipientResponse$.next({
							error: true
						});
					}
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
				this._recipientResponse$.next({
					error: !birthdayList,
					solar: birthdayList?.solar,
					lunar: birthdayList?.lunar
				});
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
