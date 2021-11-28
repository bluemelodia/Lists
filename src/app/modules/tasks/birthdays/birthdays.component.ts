import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	OnDestroy,
	OnInit
} from "@angular/core";
import { of, Subject } from "rxjs";
import { catchError, finalize, take, takeUntil } from "rxjs/operators";
import { BirthdayUtils } from "../../../utils/birthday.utils";

import { BirthdayService } from "../../../services/birthday.service";
import { DialogService } from "../../../services/dialog.service";
import { LoadingService } from "../../../services/loading.service";

import { BirthdayList } from "../../../interfaces/birthday.interface";
import { Dialog } from "../../../interfaces/dialog.interface";
import { AddBirthday } from "../../../interfaces/service/service-objects.interface";
import { ResponseStatus } from "../../../interfaces/response.interface";

@Component({
	selector: "task-birthdays",
	templateUrl: "./birthdays.component.html",
	styleUrls: ["./birthdays.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirthdaysComponent implements OnInit, OnDestroy {
	private solarBirthdays$ = new Subject<AddBirthday[]>();
	private lunarBirthdays$ = new Subject<AddBirthday[]>();
	public solarList$ = this.solarBirthdays$.asObservable();
	public lunarList$ = this.lunarBirthdays$.asObservable();

	private isLoading = false;

	private ngUnsubscribe$ = new Subject<void>();

	@HostBinding("class") public get hostClasses(): string {
		const hostStyles = [];

		if (this.isLoading) {
			hostStyles.push("hide-container");
		}

		return hostStyles.join(" ");
	}

	constructor(
		private birthdayService: BirthdayService,
		private dialogService: DialogService,
		private loadingService: LoadingService,
	) { }

	public ngOnInit(): void {
		this.addSubscriptions();
		this.getBirthdays();
	}

	private addSubscriptions() {
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
	* we"re fetching the birthdays list as a result of a patch - otherwise,
	* it should be false.
	*/
	public getBirthdays(): void {
		this.loadingService.startLoading();
		this.birthdayService.getBirthdays()
			.pipe(
				catchError(() => {
					this.dialogService.showResponseStatusDialog(ResponseStatus.ERROR, Dialog.GetBirthday);
					this.loadingService.stopLoading();
					return of(null);
				}),
				finalize(() => {
					this.loadingService.stopLoading();
				}),
				take(1),
				takeUntil(this.ngUnsubscribe$)
			)
			.subscribe((birthdays: AddBirthday[]) => {
				console.info("🍰 ✅ BirthdaysComponent ---> getBirthdays, received birthdays: ", birthdays);

				const birthdayList = BirthdayUtils.createBirthdayLists(birthdays);
				this.birthdayService.addSolarBirthdays(birthdayList);
				this.solarBirthdays$.next(birthdayList.solar);
				this.lunarBirthdays$.next(birthdayList.lunar);
			});
	}

	public ngOnDestroy(): void {
		this.ngUnsubscribe$.next();
		this.ngUnsubscribe$.complete();
	}
}
